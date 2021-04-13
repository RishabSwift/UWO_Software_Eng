import {Injectable} from '@angular/core';
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Schedule} from "../services/schedule.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AngularFireList} from "@angular/fire/database";

declare var $: any;

@Injectable({
    providedIn: 'root'
})
export class ScheduleService {

    schedulesList: AngularFirestoreCollection<any>;
    isScheduleEditMode: boolean; // for modal title...

    constructor(private firestore: AngularFirestore) {
    }

    form = new FormGroup({
        $id: new FormControl(null),
        name: new FormControl('', Validators.required),
        description: new FormControl(),
        published: new FormControl(false),
    })


    getAllSchedules() {
        this.schedulesList = this.firestore.collection('schedules');
        return this.schedulesList.snapshotChanges();
    }

    populateForm(schedule) {
        const {userId, created_at, courses, updated_at, username, ...data} = schedule;
        this.form.setValue(data);
        $('#scheduleFormModal').modal('show');
        this.isScheduleEditMode = true;
    }

    createSchedule(schedule, uid, name) {
        console.log(uid);
        this.schedulesList.add({
            ...schedule,
            ...{
                updated_at: new Date(),
                created_at: new Date(),
                userId: uid,
                username: name
            }
        });
    }


    countCoursesForSchedule(schedule) {
        if (schedule.courses) {
            return Object.keys(schedule.courses).length;
        }
        return 0;
    }

    addCourseToSchedule($scheduleId, $courseId) {
        this.schedulesList.doc($scheduleId).set({
            updated_at: new Date(),
            courses: {
                [$courseId]: true
            }
        }, {merge: true})

        window.alert('Course has been added successfully!');
    }


    updateSchedule($id, schedule) {
        schedule = {...schedule, updated_at: new Date()}
        this.schedulesList.doc($id).update(schedule).then(() => {
            this.isScheduleEditMode = false;
            console.log('updated successfully!');
        }).catch(error => {
            console.log('sorry, couldnt update', error);
        });
    }

    deleteSchedule(schedule) {

        if (confirm('Are you sure you want to delete this schedule and all its courses?')) {
            this.schedulesList.doc(schedule.$id).delete().then(() => {
                console.log('Deleted successfully!');
            }).catch((error) => {
                console.log('Error deleting schedule! ', error);
            })
        }
    }



    deleteCourse(schedule, courseId) {
        if (confirm('Are you sure you want to delete this course from this schedule?')) {
            const {courses} = schedule;
            delete courses[courseId];

            schedule.courses = courses;
            this.updateSchedule(schedule.$id, schedule);
        }

    }
}
