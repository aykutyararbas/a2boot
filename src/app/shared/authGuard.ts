import {Injectable} from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private authenticationService: AuthenticationService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
     if(AuthenticationService.PROVIDER === '') return false;
     return AuthenticationService.PROVIDER === 'firebase' ? this.authenticationService.isAuthenticated().first() : true;
  }
}

@Injectable()
export class AuthGuardFB implements CanActivate {

  constructor(private authenticationService: AuthenticationService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(AuthenticationService.PROVIDER === '') return false;
    console.log("Can activate with FB");
    return AuthenticationService.PROVIDER === 'fb' ? this.authenticationService.isAuthenticatedFb().first() : true;
  }
}


@Injectable()
export class AuthGuardGoogle implements CanActivate {

  constructor(private authenticationService: AuthenticationService){

  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if(AuthenticationService.PROVIDER === '') return false;
    console.log("Can activate with Google");
    return AuthenticationService.PROVIDER === 'google' ? this.authenticationService.isAuthenticatedGoogle() : true;
  }
}
