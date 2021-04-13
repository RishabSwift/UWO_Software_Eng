import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/firestore';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Injectable({
    providedIn: 'root'
})
export class CoursesService {

    courseList: AngularFirestoreCollection<any>;


    constructor(private firestore: AngularFirestore) {

    }

    getAllCourses() {
        this.courseList = this.firestore.collection("courses")
        return this.courseList.snapshotChanges();
    }


    createReview($courseId, uid, review) {
        this.courseList.doc($courseId).update({
            reviews: [{
                userId: uid,
                review: review,
                updated_at: new Date(),
                created_at: new Date(),
            }]
        })

        // this.courseList.doc($courseId).set({
        //     reviews: [{
        //         userId: uid,
        //         review: review,
        //         updated_at: new Date(),
        //         created_at: new Date(),
        //     }]
        // }, {merge: true})

    }




}
