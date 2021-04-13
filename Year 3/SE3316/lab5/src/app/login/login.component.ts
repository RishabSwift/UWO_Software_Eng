import {Component, Input, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    formControls = this.auth.loginForm.controls;

    constructor(public auth: AuthService, private router: Router) {
    }

    ngOnInit(): void {
        this.auth.user$.subscribe(user => {
            if (user && "activated" in user && user.activated) {
                this.router.navigate(['/dashboard']);
            }
        });
    }


    // Sign in with email/password
    login() {
        const {email, password} = this.auth.loginForm.value;
        this.auth.signIn(email, password);
        this.auth.loginForm.reset();
    }
}
