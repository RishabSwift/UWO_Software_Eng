import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Schedule} from './schedule';
import {Observable} from 'rxjs';

import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-schedule',
    templateUrl: './schedule.component.html',
    styleUrls: ['./schedule.component.scss']
})

export class ScheduleComponent implements OnInit {
    readonly ROOT_URL = 'http://localhost:2039';
    schedules: any;

    constructor(private http: HttpClient) {
    }

    newScheduleName: string;
    showAddScheduleForm: boolean;
    showUserScheduleList: boolean;

    allSchedules: [];
    firstNames: [Schedule];

    alertCreateSchedule: string;
    alertType: string;

    coursesForSchedule: any;
    showModal: boolean;

    currentlyViewingScheduleName: string;


    ngOnInit(): void {
        this.newScheduleName = '';
        this.alertCreateSchedule = '';
        this.alertType = 'alert-success';
        this.showAddScheduleForm = false;
        this.showUserScheduleList = false;
        this.showModal = false;

        this.loadMySchedule();
    }

    // load the user-created schedules
    loadMySchedule(): void {
        this.schedules = [];

        this.http.get(this.ROOT_URL + '/schedules')
            .subscribe(data => {

                // @ts-ignore
                Object.keys(data.saved).forEach(schedule => {
                    this.schedules.push({
                        name: schedule,
                        // @ts-ignore
                        courses: data.saved[schedule],
                        // @ts-ignore
                        courseCount: Object.keys(data.saved[schedule]).length
                    });
                });
            });
    }


    /**
     *  create new schedule name and save to file storage
     */
    createSchedule(): void {
        this.http.post(this.ROOT_URL + '/schedules', {
            name: this.newScheduleName
        }).catch(err => {
            // parse error message into the string...
            return Observable.of(err.error[0]);
        }).subscribe(data => {
            this.alertCreateSchedule = data.msg;
            if (data.value === undefined) {
                this.alertType = 'alert-success';
                this.newScheduleName = ''; // clear input
            } else {
                this.alertType = 'alert-danger';
            }
        });
    }


    // delete a given schedule
    deleteSchedule(name: string): void {
        this.http.delete(this.ROOT_URL + '/schedules/' + name)
            .catch(err => {
                // parse error message into the string...
                return Observable.of(err);
            }).subscribe(data => {
            if (data.msg === undefined) { // no msg means an error has been returned...
                this.alertType = 'alert-danger';
                this.alertCreateSchedule = 'This schedule cannot be found.';
            } else {
                this.alertType = 'alert-success';
                this.alertCreateSchedule = data.msg;
            }

            this.loadMySchedule(); // reload schedule...

        });

    }

    deleteAllSchedules(): void {
        this.http.delete(this.ROOT_URL + '/schedules')

            .catch(err => {
                // parse error message into the string...
                return Observable.of(err);
            }).subscribe(data => {
            if (data.msg === undefined) { // no msg means an error has been returned...
                this.alertType = 'alert-danger';
                this.alertCreateSchedule = 'Error deleting schedules.';
            } else {
                this.alertType = 'alert-success';
                this.alertCreateSchedule = data.msg;
            }

            this.loadMySchedule(); // reload schedule...

        });

    }

    // view a specific schedule... meaning view the schedule that the user has selected to view
    viewSchedule(name: string): void {

        this.currentlyViewingScheduleName = name; // to display at top of modal
        this.showModal = true;

        this.http.get(this.ROOT_URL + '/schedules/' + name)
            .toPromise()
            .then(data => {
                // @ts-ignore
                this.coursesForSchedule = data.courses;
            })
            .then(() => {
                this.coursesForSchedule.forEach((item) => {

                    this.http.get(this.ROOT_URL + `/subjects/${item[0].subject}/courses/${item[0].id}`).toPromise()
                        .then(data => {
                            // @ts-ignore
                            item[0].component = data[0].component;
                            // @ts-ignore
                            item[0].days = data[0].days;
                            // @ts-ignore
                            item[0].status = data[0].status;
                        });
                });
            });
    }
}
