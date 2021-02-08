import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AuthContext} from './models/AuthContext.model';
import {Apis} from './models/apis';
import {environment} from '../environments/environment';
import {Scope} from './models/scopes';
import {EntryPointComponent} from './pages/entry-point/entry-point.component';
import {LoginComponent} from './pages/login/login.component';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EntryPointComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: AuthContext,
    useValue: {
      apis: [Apis.AUTH2, Apis.CLIENT].join(':'),
      clientId: environment.clientId,
      scope: [Scope.EMAIL, Scope.PROFILE,
        'https://www.googleapis.com/auth/drive',
        'https://www.googleapis.com/auth/drive.appdata',
        'https://www.googleapis.com/auth/drive.file',
        'https://www.googleapis.com/auth/drive.metadata',
        'https://www.googleapis.com/auth/drive.metadata.readonly',
        'https://www.googleapis.com/auth/drive.photos.readonly',
        'https://www.googleapis.com/auth/drive.readonly',
        'https://www.googleapis.com/auth/devstorage.read_write']
    }
  }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
