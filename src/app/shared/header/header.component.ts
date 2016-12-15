import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthenticationService} from "../authentication.service";
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy{

  isAuthenticated = false;

  private subscription: Subscription;
  constructor(private authenticationService: AuthenticationService, private router: Router) {
    this.subscription = this.authenticationService.isAuthenticated().subscribe(
      authStatus => {
        this.isAuthenticated = authStatus
        if(authStatus === true){
            this.router.navigate(['/welcomehome']);
        } else {
          this.router.navigate(['/welcome']);
        }
      }
    );
  }

  ngOnInit() {
  }

  isAuth(){
    return this.isAuthenticated;
  }

  onLogout(){
    this.authenticationService.logout();
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
