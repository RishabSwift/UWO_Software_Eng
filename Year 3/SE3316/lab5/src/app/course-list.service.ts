import {Injectable} from '@angular/core';
import {AngularFirestore} from "@angular/fire/firestore";
import {ScheduleService} from "./services/schedule.service";

@Injectable({
    providedIn: 'root'
})
export class CourseListService {

    allSchedules = [];


    constructor(private firestore: AngularFirestore, private scheduleService: ScheduleService) {
    }


    courseListNameAlreadyExists(name: string) {
        return this.firestore.collection("course-lists").snapshotChanges();
    }

    saveList(name: string, description: string, visibility: boolean) {
        // this.firestore.collection('course-lists').
    }
}
