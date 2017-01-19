/**
 * Created by ayararba on 12/10/16.
 */
import {Routes,RouterModule} from '@angular/router'
import {SigninComponent} from './unprotected/signin/signin.component'
import {SignupComponent} from './unprotected/signup/signup.component'
import {WelcomeComponent} from "./unprotected/welcome.component";
import {AuthGuard, AuthGuardFB, AuthGuardGoogle} from "./shared/authGuard";
import {WelcomehomeComponent} from "./welcomehome.component";
import {UxComponent} from "./util/ux/ux.component";

const APP_ROUTER: Routes = [
  {path: '', redirectTo: '/welcome', pathMatch: 'full'},
  {path: 'signup', component: SignupComponent},
  {path: 'signin', component: SigninComponent},
  {path: 'welcome', component: WelcomeComponent},
  {path: 'ux', component: UxComponent},
  {path: 'welcomehome', component: WelcomehomeComponent, canActivate: [AuthGuard, AuthGuardGoogle, AuthGuardFB]}
];

export const routing = RouterModule.forRoot(APP_ROUTER)
