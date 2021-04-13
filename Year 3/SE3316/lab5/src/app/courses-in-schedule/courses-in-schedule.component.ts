import {Component, Input, OnInit} from '@angular/core';
import {ScheduleService} from "../services/schedule.service";

declare var $: any;

@Component({
    selector: 'app-courses-in-schedule',
    templateUrl: './courses-in-schedule.component.html',
    styleUrls: ['./courses-in-schedule.component.scss']
})

export class CoursesInScheduleComponent implements OnInit {

    constructor(public scheduleService: ScheduleService) {
    }

    @Input() showDelete: boolean;
    @Input() selectedSchedule: any;
    @Input() allCourses: any;
    @Input() modalId: string;
    selectedScheduleCourses: any;

    ngOnInit(): void {
    }


    deleteCourseInSchedule(selectedSchedule, courseId) {
        this.scheduleService.deleteCourse(selectedSchedule, courseId);
        this.getCoursesInSchedule(selectedSchedule);
    }

    getCoursesInSchedule(schedule) {
        this.selectedSchedule = schedule;

        $(`#${this.modalId}`).modal('show');

        if (!schedule.courses) {
            return [];
        }

        this.selectedScheduleCourses = this.allCourses.filter(i => Object.keys(schedule.courses).includes(i.id));

    }

}
