import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import {User} from "./user.interface";
import {Router} from "@angular/router";
import {Subject, Observable} from "rxjs";

declare var firebase:  any;

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
    firebase.auth().signInWithEmailAndPassword(user.email, user.password).then(function (state){

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

  logout(){
    firebase.auth().signOut();
    this.router.navigate(['/signin']);
  }
}
