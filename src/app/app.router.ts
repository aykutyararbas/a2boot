/**
 * Created by ayararba on 12/10/16.
 */
import {Routes,RouterModule} from '@angular/router'
import {SigninComponent} from './unprotected/signin/signin.component'
import {SignupComponent} from './unprotected/signup/signup.component'
import {WelcomeComponent} from "./unprotected/welcome.component";
import {AuthGuard} from "./shared/authGuard";
import {WelcomehomeComponent} from "./welcomehome.component";

const APP_ROUTER: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent },
  {path: 'signin', component: SigninComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'welcomehome', component: WelcomehomeComponent, canActivate: [AuthGuard]}
  ]

export const routing = RouterModule.forRoot(APP_ROUTER)
