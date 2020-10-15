import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  public httpOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new Headers({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('AUTH_TOKEN'),
      }),
    };
  }

  getMomentList(): Observable<any> {
    return this.http.get(
      environment.apiEndPoint + `user/list-moment`,
      this.httpOptions
    );
  }

  createMomentService(requestBody): Observable<any> {
    return this.http.post(
      environment.apiEndPoint + `ser/add-moment`,requestBody,
      this.httpOptions
    );
  }
  uppdateMomentService(id,requestBody): Observable<any> {
    return this.http.post(
      environment.apiEndPoint + `user/update-moment/${id}`,requestBody,
      this.httpOptions
    );
  }
  deleteMomentService(id): Observable<any> {
    return this.http.delete(
      environment.apiEndPoint + `user/delete-moment/${id}`,
      this.httpOptions
    );
  }
  getMomentById(id): Observable<any> {
    return this.http.get(
      environment.apiEndPoint + `user/update-moment/${id}`,
      this.httpOptions
    );
  }
}
