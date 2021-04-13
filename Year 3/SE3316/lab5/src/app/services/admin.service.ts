import { Injectable } from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  adminList: AngularFirestoreCollection<any>;

  constructor(private firestore: AngularFirestore) {

  }

  getAllAdminList() {
    this.adminList = this.firestore.collection('users');
    return this.adminList.snapshotChanges();
  }


}
