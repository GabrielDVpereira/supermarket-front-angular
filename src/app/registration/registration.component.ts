import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import {Router} from '@angular/router';



@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  constructor(private registration : RegistrationService,  private router: Router) { }

  userData: Object = {
    name: '',
    email: '',
    password: ''
  };
  errorMessage: String = '';
  passwordType: String = 'password';

  ngOnInit() {
  }

  registerUser(){
    console.log('registerUser')
    this.registration.register(this.userData)
      .subscribe(
        (response) => {
          if(response)
            this.router.navigateByUrl('/home')
        }, 
        (error) => {
          console.log(error);
          this.errorMessage = error.error;
        });
  }

  togglePassword(){
    if(this.passwordType === 'password'){
      this.passwordType = 'text';
    } else {
      this.passwordType = 'password';
    }
  }
}
