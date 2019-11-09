import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, tap, retry } from 'rxjs/operators';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  create(market_id, product){
    return this.http.post(`http://localhost:3333/product/${market_id}/create`, product)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  list(market_id){
    return this.http.get(`http://localhost:3333/product/${market_id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }

  delete(product_id){
    return this.http.delete(`http://localhost:3333/product/${product_id}`)
    .pipe(
      retry(2),
      catchError(this.handleError)
    )
  }


  handleError(error: HttpErrorResponse){
    return throwError(error);
  }

}
