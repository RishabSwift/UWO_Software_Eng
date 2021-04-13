import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";

@Injectable({
    providedIn: 'root'
})
export class ReviewService {


    form = new FormGroup({
        $id: new FormControl(null),
        review: new FormControl('', Validators.required),
    })

    reviewList: AngularFirestoreCollection<any>;

    constructor(private firestore: AngularFirestore) {

    }


    getAllReviews() {
        this.reviewList = this.firestore.collection('reviews');
        return this.reviewList.snapshotChanges();
    }

    hideReview(review) {
        this.updateReview(review.$id, false);
    }


    showReview(review) {
        this.updateReview(review.$id, true);
    }

    updateReview($id, visibility = true) {
        this.reviewList.doc($id).update({
            visible: visibility
        }).then(() => {
            console.log('updated successfully!');
        }).catch(error => {
            console.log('sorry, could not update', error);
        });
    }

    delete(review) {
        if (confirm('Are you sure you want to delete this review?')) {
            this.reviewList.doc(review.$id).delete().then(() => {
                console.log('Deleted successfully!');
            }).catch((error) => {
                console.log('Error deleting review! ', error);
            })
        }
    }


    createReview(review, uid, username, course) {
        this.reviewList.add({
            review: review,
            courseId: course.$id,
            courseName: `${course.subject} - ${course.number}`,
            username: username,
            updated_at: new Date(),
            created_at: new Date(),
            userId: uid,
            visible: true,
        });
    }
}
