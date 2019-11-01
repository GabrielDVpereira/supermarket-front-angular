import { Component, OnInit } from '@angular/core';
import { User } from './User';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'supermarket-front';
  currentUser: User;
  token: string;

  constructor( private router: Router){}

  ngOnInit(){
    this.token = localStorage.getItem("token")
    if(this.token){
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
