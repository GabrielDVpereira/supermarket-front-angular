import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
   token: string; 

  constructor() { }

  get(){
    return localStorage.getItem('token');
  }

  set(token){
    localStorage.setItem('token', token);
    this.token = token;
  }
}
