import {Component, Input, OnInit, OnChanges} from '@angular/core';
import {Schedule} from "../services/schedule.model";
import {ScheduleService} from "../services/schedule.service";

@Component({
    selector: 'app-public-schedule',
    templateUrl: './public-schedule.component.html',
    styleUrls: ['./public-schedule.component.scss']
})
export class PublicScheduleComponent implements OnInit, OnChanges {

    constructor(public scheduleService: ScheduleService) {
    }


    @Input() publicSchedules = [];
    @Input() allCourses = [];
     selectedSchedule;

    ngOnInit(): void {
    }

    ngOnChanges(): void {
        this.publicSchedules = this.publicSchedules?.filter(schedule => schedule.published == true)
        if (this.publicSchedules?.length > 10) {
            this.publicSchedules.length = 10;
        }
    }

    showCoursesInSchedule(sharedSchedule: any,coursesInSchedule) {
        this.selectedSchedule = sharedSchedule;
        coursesInSchedule.getCoursesInSchedule(sharedSchedule);
    }
}
