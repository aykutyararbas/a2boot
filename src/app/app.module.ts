import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import {routing} from "./app.router";

import { HeaderComponent } from './shared/header/header.component';
import { SigninComponent } from './unprotected/signin/signin.component';
import { SignupComponent } from './unprotected/signup/signup.component';
import { WelcomeComponent } from './unprotected/welcome.component';
import {AuthenticationService} from "./shared/authentication.service";
import {AuthGuard, AuthGuardFB, AuthGuardGoogle} from "./shared/authGuard";
import { WelcomehomeComponent } from './welcomehome.component';
import { UxComponent } from './util/ux/ux.component';
import { LoginComponent } from './util/ux/login/login.component';
import { FormComponent } from './util/ux/form/form.component';
import { ModalComponent } from './util/ux/modal/modal.component';
import { CardsComponent } from './util/ux/cards/cards.component';
import { ButtonsComponent } from './util/ux/buttons/buttons.component';
import { CollapseComponent } from './util/ux/collapse/collapse.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent,
    WelcomehomeComponent,
    UxComponent,
    LoginComponent,
    FormComponent,
    ModalComponent,
    CardsComponent,
    ButtonsComponent,
    CollapseComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthenticationService, AuthGuard, AuthGuardFB, AuthGuardGoogle],
  bootstrap: [AppComponent]
})
export class AppModule {

  constructor(){ }

}
