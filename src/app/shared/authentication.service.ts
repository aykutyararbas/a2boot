import {Injectable, EventEmitter} from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user.interface";
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";

declare var firebase:  any;
declare var FB: any;
declare var gapi: any;

@Injectable()
export class AuthenticationService {
  static PROVIDER: string = '';
  public authenticationNotice:  EventEmitter<string>;
  public   auth2: any;
  private sessionParams = {
    'client_id': '',
    'session_state': null
  };
  constructor(private http:  Http, private router: Router) {
    this.authenticationNotice = new  EventEmitter<string>();
  }

  signup(user: User){
    firebase.auth().createUserWithEmailAndPassword(user.email, user.password).catch(function(error) {
      console.log(error.status);
    });
  }

  signin(user: User){
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then( (state) =>{
      AuthenticationService.PROVIDER = "firebase";
      this.authenticationNotice.emit("firebase");
    }).catch(function (error) {
      console.log(error);
    });

  }

  isAuthenticated(): Observable<boolean> {
    const subject = new Subject<boolean>();
    firebase.auth().onAuthStateChanged(function(user){
          if(user){
            subject.next(true);
          } else {
            subject.next(false);
          }
    });
    return subject.asObservable();
  }

  isAuthenticatedFb(): Observable<boolean> {
    const subject = new Subject<boolean>();
    FB.getLoginStatus((response)=> {
      if (response.status === 'connected') {
        console.log("is auth fb true");
        subject.next(true);
        console.log("subject set to rue");
      } else {
        console.log("is auth fb false");
        subject.next(false);
      }
    });
    return subject.asObservable();
  }

  isAuthenticatedGoogle(): Observable<boolean>|boolean {
    if(this.auth2 && this.auth2.isSignedIn.get() == true){
      return true;
    } else {
      return false;
    }
  }

  logout(){
    firebase.auth().signOut();
    AuthenticationService.PROVIDER = "";
    this.router.navigate(['/signin']);
  }

  signinWithFB(){
    FB.login((response)=> {
      if (response.authResponse) {
        FB.api('/me', (response)=> {
          AuthenticationService.PROVIDER="fb";
          this.authenticationNotice.emit("fb");
          console.log("Facebook logged in");
        });
      } else {
        console.log('User cancelled login or did not fully authorize.');
      }
    });
  }

  signoutFromFB(){
    FB.logout((response)=> {
      AuthenticationService.PROVIDER="";
      this.router.navigate(['/signin']);
    });
  }

  signoutFromGoogle(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(()=>{
      AuthenticationService.PROVIDER="";
      this.router.navigate(['/signin']);
    });
  }
}
