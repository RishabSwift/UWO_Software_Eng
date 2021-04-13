import {Component, OnInit} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/of';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

    readonly ROOT_URL = 'http://localhost:2039';

    constructor(private http: HttpClient) {
    }

    scheduleList: any;
    subjectList: any;
    componentList: any;
    searchList: any;

    subjectInput: string;
    courseInput: string;
    componentInput: string;
    showModal: boolean;


    // for "Add to Schedule" button... set it for proper task
    selectedCourseId: string;
    selectedSubject: string;
    selectedSchedule: string;

    ngOnInit(): void {
        this.subjectList = [];
        this.componentList = [];
        this.scheduleList = [];
        this.loadSubjects();
        this.loadComponents();
        this.loadMySchedule();
        this.showModal = false;
    }

    // load all user-created subjects
    loadSubjects(): void {
        this.http.get(this.ROOT_URL + '/subjects')
            .subscribe(data => {
                this.subjectList = data;
            });
    }

    // load the course components (LAB, TUT, LEC)
    loadComponents(): void {
        this.http.get(this.ROOT_URL + '/components')
            .subscribe(data => {
                this.componentList = data;
            });
    }

    // search given user provided inputs
    search(): void {

        const params = new HttpParams().set('subject', this.subjectInput || '')
            .set('course', this.courseInput || '')
            .set('component', this.componentInput || '');

        this.http.get(this.ROOT_URL + '/search', {params})
            .subscribe(data => {
                this.searchList = data;
            });
    }

    // start process of adding a specific course from search results to schedule
    // open modal to select user-created schedule
    addCourseToSchedule(courseId: string, subject: string): void {
        this.selectedCourseId = courseId;
        this.selectedSubject = subject;
        this.loadMySchedule();
        this.showModal = true;
    }

    // save the selected schedule using a schedule name
    saveCourseInSchedule(): void {
        this.http.put(this.ROOT_URL + `/schedules/${this.selectedSchedule}/subjects/${this.selectedSubject}/courses/${this.selectedCourseId}`, {})
            .subscribe(data => {
                // how
            });

        this.showModal = false;

    }

    // get the unique colour of the component
    getComponentCssClass(component: string): string {
        switch (component) {
            case 'LEC':
                return 'text-success';
            case 'TUT':
                return 'text-danger';
            case 'LAB':
                return 'text-warning';
        }
    }

    // load the user generated schedules
    loadMySchedule(): void {
        this.scheduleList = [];

        this.http.get(this.ROOT_URL + '/schedules')
            .subscribe(data => {

                // @ts-ignore
                Object.keys(data.saved).forEach(schedule => {
                    this.scheduleList.push({
                        name: schedule,
                        // @ts-ignore
                        courses: data.saved[schedule],
                        // @ts-ignore
                        courseCount: Object.keys(data.saved[schedule]).length
                    });
                });
            });
    }

}
