import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {User} from "../../shared/user.interface";
import {AuthenticationService} from "../../shared/authentication.service";
import {Router} from "@angular/router";

declare var gapi:any;


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})


export class SigninComponent implements OnInit {

  private myForm: FormGroup;
  private error = false;
  private errorMessage = '';

  constructor(private fb: FormBuilder, private authenticationService: AuthenticationService, private router: Router) {}

  onSignin() {
   this.authenticationService.signin(this.myForm.value);
  }


   onGoogleSigninSuccess=(googleUser: any)=>{
     var profile = googleUser.getBasicProfile();
     console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
     console.log('Name: ' + profile.getName());
     console.log('Image URL: ' + profile.getImageUrl());
     console.log('Email: ' + profile.getEmail());
   }

  onGoogleSigninFailure=(e)=>{
    console.log("Google signin error");
  }




  ngOnInit():any {

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });

    gapi.signin2.render('google-signin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': this.onGoogleSigninSuccess,
      'onfailure': this.onGoogleSigninFailure
    });

  }

}
