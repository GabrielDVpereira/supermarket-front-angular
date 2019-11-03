import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {Router} from '@angular/router';
import { User } from '../User';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: String = '';
  password: String = '';
  errorMessage: String  = '';

  constructor(private login: LoginService, private router: Router, private tokenService: TokenService) { }

  ngOnInit() {
    
  }

  authenticate = () => {
    this.login.httpRequest(this.email, this.password)
      .subscribe(
        (response: User) => {
          if(response) {
            this.tokenService.set(response.token);
            this.router.navigateByUrl('/home')
          }
      },
        (error) => {
          console.log('an error happend: ' + error.error)
          this.errorMessage = error.error;
        })     
  }

}
