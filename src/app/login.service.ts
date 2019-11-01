import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import {Observable } from 'rxjs';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LoginService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' }) 
  };

  constructor(private http: HttpClient) { }

  httpRequest = (email: String, password: String) => {
    const userAuthData = { email, password };
    return this.http.post(`http://localhost:3333/authUser`, userAuthData, this.httpOptions)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse){
    console.log('lalala');
    return throwError(error);
  }
}
