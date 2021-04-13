import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {CoursesService} from "../shared/courses.service";
import {ScheduleService} from "../services/schedule.service";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    allCourses: any;
    allSchedules: any;

    constructor(public auth: AuthService, private coursesService: CoursesService, private scheduleService: ScheduleService) {
    }

    ngOnInit(): void {
        this.getCourses();
        this.getSchedules();
    }


    getCourses = () => this.coursesService.getAllCourses().subscribe(res => {
        this.allCourses = res.map(item => {
            return {
                $id: item.payload.doc.id,
                // @ts-ignore
                ...item.payload.doc.data()
            };
        });
    });

    getSchedules() {
        this.scheduleService.getAllSchedules().subscribe(res => {
            this.allSchedules = res.map(item => {
                return {
                    // @ts-ignore
                    $id: item.payload.doc.id,
                    // @ts-ignore
                    ...item.payload.doc.data()
                };
            });

            this.allSchedules = this.allSchedules.sort((a, b) => b.updated_at - a.updated_at)
        });
    }


    getLocalUser() {
        return JSON.parse(localStorage.getItem('user'));
    }
}
