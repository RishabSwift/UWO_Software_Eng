import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class PagesService {

    pagesList: AngularFirestoreCollection<any>;

    constructor(private firestore: AngularFirestore) {

    }

    getPagesList() {
        this.pagesList = this.firestore.collection('pages');
        return this.pagesList.snapshotChanges();
    }

    updatePage(page, newText) {
        this.pagesList.doc(page.$id).update({
            text: newText
        }).then(() => {
            console.log('updated successfully!');
        }).catch(error => {
            console.log('sorry, could not update', error);
        });
    }

}
