import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from '../Services/auth.service';

@Injectable({
  providedIn: 'root'
})

export class authGuard implements CanActivate {
  constructor(private authService: AuthService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    const userLoggedIn = this.authService.getTokenFromStorage();

    if (userLoggedIn) {
      return true;
    } else {
      return false;
    }
  }
}

