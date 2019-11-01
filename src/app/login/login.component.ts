import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { User } from '../User';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  errorMessage: String  = '';

  constructor(private login: LoginService, private router: Router) { }

  ngOnInit() {
  }

  authenticate = () => {
    this.login.httpRequest(this.email, this.password)
      .subscribe(
        (response: User) => {
          if(response) {
            localStorage.setItem("token", response.token)
            this.router.navigateByUrl('/home')
          }
          },
        (error) => {
          console.log('an error happend: ' + error.error)
          this.errorMessage = error.error;
        })     
  }

}
