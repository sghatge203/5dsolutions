import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MomentService {
  public httpOptions;
  public httpFileOptions;
  constructor(private http: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-access-token': localStorage.getItem('AUTH_TOKEN'),
      }),
    };
    this.httpFileOptions = {
      headers: new HttpHeaders({
        'x-access-token': localStorage.getItem('AUTH_TOKEN')
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
      environment.apiEndPoint + `user/add-moment`,requestBody,
      this.httpFileOptions
    );
  }
  uppdateMomentService(requestBody): Observable<any> {
    return this.http.post(
      environment.apiEndPoint + `user/update-moment`,requestBody,
      this.httpFileOptions
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
  ediMomentService(id):Observable<any>{
    return this.http.get(
      environment.apiEndPoint + `user/get-moment-id/${id}`,
      this.httpOptions
    );
  }
}
