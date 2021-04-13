import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class UserService {


    usersList: AngularFirestoreCollection<any>;

    constructor(private firestore: AngularFirestore) {

    }


    getAllUsers() {
        this.usersList = this.firestore.collection('users');
        return this.usersList.snapshotChanges();
    }

    isUserDisabled(user) {
       return user.activated == false;
    }


}
