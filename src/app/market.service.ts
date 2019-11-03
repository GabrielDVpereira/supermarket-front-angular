import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Market } from './Market';
@Injectable({
  providedIn: 'root'
})
export class MarketService {

  constructor(private http: HttpClient) { }

  createMarket(market) : any {
    return this.http.post('http://localhost:3333/createMarket', market);
  }
  
  markets(){
    return this.http.get('http://localhost:3333/markets');
  }
}
