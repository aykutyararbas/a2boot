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
import {AuthGuard} from "./shared/authGuard";
import { WelcomehomeComponent } from './welcomehome.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SigninComponent,
    SignupComponent,
    WelcomeComponent,
    WelcomehomeComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    routing
  ],
  providers: [AuthenticationService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
