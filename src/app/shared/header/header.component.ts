import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

declare var gapi: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isAuthenticated = false;

  private subscription: Subscription;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.authenticationService.authenticationNotice.subscribe((notice)=>{
       this.subscribeTo(notice);
    })
  }

  subscribeTo(notice: string){
    if(this.subscription) this.subscription.unsubscribe();
    switch(notice) {
      case "firebase" : {
        this.subscription = this.authenticationService.isAuthenticated().subscribe(authStatus => {
          this.listen(authStatus);
        });
        break;
      }
      case "fb": {
        console.log("Header subscribe to FB");
        this.subscription = this.authenticationService.isAuthenticatedFb().subscribe(authStatus => {
          this.listen(authStatus);
        });
        break;
      }
      case "google": {
        this.listen(this.authenticationService.isAuthenticatedGoogle());
        break;
      }
    }
  }

  listen(authStatus){
      this.isAuthenticated = authStatus
      if(authStatus === true){
        console.log("Router goes home");
        this.router.navigate(['/welcomehome']);
      } else {
        console.log("Router goes out");
        this.router.navigate(['/welcome']);
      }
  }
  ngOnInit() {
  }

  isAuth(){
    return this.isAuthenticated;
  }

  onLogout(){
    switch(AuthenticationService.PROVIDER){
      case "firebase": {
        this.authenticationService.logout();
        return;
      }
      case "fb": {
        this.authenticationService.signoutFromFB();
        return;
      }
      case "google": {
        this.authenticationService.signoutFromGoogle();
        return;
      }
    }

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
