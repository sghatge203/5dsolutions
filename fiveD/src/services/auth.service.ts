import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('AUTH_TOKEN'),
      }),
    };
  }

  loginService(requestBody): Observable<any> {
    return this.http.post(
      environment.apiEndPoint + 'auth/login',
      requestBody,
      this.httpOptions
    );
  }
  registerService(requestBody): Observable<any> {
    return this.http.post(
      environment.apiEndPoint + 'auth/register',
      requestBody,
      this.httpOptions
    );
  }
}
