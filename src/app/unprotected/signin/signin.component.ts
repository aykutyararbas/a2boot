import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from "@angular/forms";
import {User} from "../../shared/user.interface";
import {AuthenticationService} from "../../shared/authentication.service";
import {Router} from "@angular/router";

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

  ngOnInit():any {

    this.myForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

}
