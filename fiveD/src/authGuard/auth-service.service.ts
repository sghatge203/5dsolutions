import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export  class AuthServiceService {
  constructor() {}

  public isAuthenticated() {
    let authFlag = false;
    if (localStorage.getItem('AUTH_TOKEN')) {
      authFlag = true;
    } else {
      authFlag = false;
    }
    return authFlag;
  }
}
