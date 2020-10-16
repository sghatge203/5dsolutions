import { Injectable } from '@angular/core';
import {AuthServiceService} from './auth-service.service';
import { Router, CanActivate } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(public authService: AuthServiceService, public router: Router) {}

  canActivate(): boolean {
    if (!this.authService.isAuthenticated()) {
      this.router.navigate(['']);
      return false;
    }
    return true;
  }
}
