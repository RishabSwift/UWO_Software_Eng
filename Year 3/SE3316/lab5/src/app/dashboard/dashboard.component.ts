import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth/auth.service";
import {User} from "../services/user.model";
import {ScheduleService} from "../services/schedule.service";
import {CoursesService} from "../shared/courses.service";

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    user: User;

    constructor(public auth: AuthService, private coursesService: CoursesService, private scheduleService: ScheduleService) {
    }

    allCourses: any;
    allSchedules: any;
    allUserSchedules: any;

    ngOnInit(): void {
        this.auth.user$.subscribe(user => {
            this.user = user;
        })
        this.getCourses();
        this.getSchedules();
    }


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

            this.allUserSchedules = this.allSchedules.filter(item => {
                return item.userId == this.auth.getUser().uid;
            })
        });
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

}
