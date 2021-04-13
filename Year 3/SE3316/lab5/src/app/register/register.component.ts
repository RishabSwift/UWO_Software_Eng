import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth/auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formControls = this.auth.registerForm.controls;

  constructor(public auth: AuthService) { }

  ngOnInit(): void {
    // if (this.auth.getUser() && this.auth.getUser().emailVerified) {
    //   window.alert('Ok now verify your email');
    // }
  }

  register() {
    // this.auth.signUp()
    //  this.auth.registerForm.value;
     this.auth.signUp(this.auth.registerForm.value);
     this.auth.registerForm.reset();

  }


}
