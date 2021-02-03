import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {EntryPointComponent} from './pages/entry-point/entry-point.component';
import {LoginComponent} from './pages/login/login.component';

const routes: Routes = [
  {
    path: 'entry',
    component: EntryPointComponent

  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: '', redirectTo: 'login', pathMatch: 'full'

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
