import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {User} from "../services/user.model";
import {UserService} from "../services/user.service";

@Component({
    selector: 'app-admin-users',
    templateUrl: './admin-users.component.html',
    styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {

    allUsers: any;
    randomNumber: number;

    constructor(public auth: AuthService, private userService: UserService) {
    }

    ngOnInit(): void {
        this.loadUsers();
        this.randomNumber = this.getRandomImage();
    }

    loadUsers = () => this.userService.getAllUsers().subscribe(res => {
        this.allUsers = res.map(item => {
            return {
                $id: item.payload.doc.id,
                // @ts-ignore
                ...item.payload.doc.data()
            };
        });
    });


    // get random number to get the profile cover img...
    private getRandomImage() {
        return Math.floor(Math.random() * 6) + 2;
    }
}
