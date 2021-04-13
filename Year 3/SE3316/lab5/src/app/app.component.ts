import {Component, OnInit} from '@angular/core';
import {AngularFireModule} from "@angular/fire";
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from "./services/auth/auth.service";
import {User} from "./services/user.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

    title = 'lab5';
    allCourses;
    user: User;


    constructor(private firestore: AngularFirestore, public auth: AuthService) {


    }


    ngOnInit(): void {
        this.auth.user$.subscribe(user => {
            console.log('from app!');
            console.log(user);
            this.user = user
        });
    }


}
