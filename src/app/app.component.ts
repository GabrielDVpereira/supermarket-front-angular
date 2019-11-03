import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { Router } from '@angular/router';

import { TokenService } from './token.service';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supermarket-front';
  currentUser: User;


  constructor( private router: Router, private tokenService: TokenService){}

  ngOnInit(){ 
    if(this.tokenService.get()){
      this.router.navigateByUrl('/home');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout(){
    localStorage.removeItem("token");
    this.router.navigateByUrl('/login');
  }
}
