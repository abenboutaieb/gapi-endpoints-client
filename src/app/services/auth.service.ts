import {Injectable, NgZone} from '@angular/core';
import AuthConfig = gapi.auth2.AuthorizeConfig;
import BasicProfile = gapi.auth2.BasicProfile;
import {Router} from '@angular/router';
import {AuthContext} from '../models/AuthContext.model';
import {AuthPrompt} from '../models/auth-prompt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  initGapi: Promise<any>;
  profile: BasicProfile;

  constructor(private authCtx: AuthContext, private router: Router, private ngZone: NgZone) {
  }

  login(): void {
    this.initGapi = new Promise((resolve) => gapi.load(this.authCtx.apis, resolve));
    this.initGapi.then(() => this.authInit(AuthPrompt.CONSENT, this.scopes()));
  }

  logout(): void {
    gapi.auth2.getAuthInstance().signOut();
    this.setProfile(null);
  }

  authInit(prompt: string, scope: string): void {
    const authInitSuccess = (auth2) => {
      if (!auth2.isSignedIn.get()) {
        auth2.signIn().then(() => {
          this.setProfile(auth2);
        }, authInitError);
      } else {
        this.setProfile(auth2);
      }
    };
    const authInitError = (err) => {
      console.error(err);
    };
    const options: AuthConfig = {client_id: this.authCtx.clientId, scope, prompt};
    gapi.auth2.init(options).then(authInitSuccess, authInitError);
  }

  setProfile(auth2): void {
    this.ngZone.run(() => {
      if (auth2) {
        this.profile = auth2.currentUser.get().getBasicProfile();
        this.router.navigate(['/entry']);
      } else {
        this.profile = null;
        this.router.navigate(['/login']);
      }
    });

  }

  scopes(): string {
    return this.authCtx.scope.join(' ');
  }
}
