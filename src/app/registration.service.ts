import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders,HttpErrorResponse } from   '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistrationService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json' }) 
  };
  constructor(private http: HttpClient) { }

  register(userData: Object){
    return this.http.post('http://localhost:3333/createUser', userData,this.httpOptions )
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
  handleError(error: HttpErrorResponse){
    console.log('lalala');
    return throwError(error);
  }
}
