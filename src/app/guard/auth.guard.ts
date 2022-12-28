import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    /*---------- Detect active session ----------*/
    if (localStorage.getItem('Token')) {
      return true;
    }

    /*---------- Detect user not logged----------*/
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}