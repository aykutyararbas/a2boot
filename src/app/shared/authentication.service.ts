import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user.interface";
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";

declare var firebase:  any;
declare var FB: any;
declare var gapi: any;
@Injectable()
export class AuthenticationService {

  constructor(private http:  Http, private router: Router) {

  }

  signup(user: User){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      console.log(error.status);
    });
  }

  signin(user: User){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then( (state) =>{
      //this.provider="firebase";
    }).catch(function (error) {
      console.log(error);
    });

  }

  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    switch(""){//this.provider){
      case "fb": {
        FB.getLoginStatus((response)=> {
            if (response.status === 'connected') {
              subject.next(true);
            } else {
              subject.next(false);
            }
        });
        break;
      }
      case "firebase": {
        firebase.auth().onAuthStateChanged(function(user){
          if(user){
            subject.next(true);
          } else {
            subject.next(false);
          }
        });
        break;
      }
      case "google": {
        break;
      }
    }

    return subject.asObservable();
  }

  logout(){
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }

  signinWithFB(){
    FB.login((response)=> {
      if (response.authResponse) {
        console.log('Welcome!  Fetching your information.... ');
        FB.api('/me', (response)=> {
         // this.provider="fb";
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  signoutFromFB(){
    FB.logout((response)=> {
      // user is now logged out
     // this.provider="";
    });
  }

  signoutFromGoogle(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
     // this.provider="";
    });
  }
}
