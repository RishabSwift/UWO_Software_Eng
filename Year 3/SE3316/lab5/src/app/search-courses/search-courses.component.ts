import {Component, OnInit, Input} from '@angular/core';
import {CoursesService} from "../shared/courses.service";
import FuzzySearch from 'fuzzy-search';
import {AuthService} from "../services/auth/auth.service";
import {ScheduleService} from "../services/schedule.service";
import {ReviewService} from "../services/review.service";
import {User} from "../services/user.model";


declare var $: any;

@Component({
    selector: 'app-search-courses',
    templateUrl: './search-courses.component.html',
    styleUrls: ['./search-courses.component.scss']
})
export class SearchCoursesComponent implements OnInit {

    constructor(public coursesService: CoursesService, public auth: AuthService, public scheduleService: ScheduleService, public reviewService: ReviewService) {
    }


    formControls = this.reviewService.form.controls;

    @Input() allSchedules = [];
    @Input() allCourses = [];
    @Input() user: User;

    filteredCourses = [];
    allReviews = [];

    searchInput: string;
    searchComponent: string;
    subjectInput: string;
    isLoggedIn: boolean;
    currentSelectedCourse: any;

    ngOnInit(): void {
        this.searchInput = "";
        this.searchComponent = "";
        this.subjectInput = "";
        this.loadReviews();
    }


    getSubjects() {
        let all = this.allCourses?.map(item => {
            return item.subject;
        });
        return [...new Set(all)].sort(); // all unique
    }


    loadReviews = () => this.reviewService.getAllReviews().subscribe(res => {
        this.allReviews = res.map(item => {
            return {
                $id: item.payload.doc.id,
                // @ts-ignore
                ...item.payload.doc.data()
            };
        });

        this.allReviews = this.allReviews.sort((a, b) => b.updated_at - a.updated_at)

        this.allReviews = this.allReviews.filter(item => {
            return item.visible == true;
        })
    });


    searchCourses() {

        if (this.searchInput === "" || this.searchComponent === "" || this.subjectInput === "") {
            this.filteredCourses = this.allCourses;
        }

        if (this.allCourses.length === 0) {
            return;
        }

        // if it's less than 4 characters, don't search yet..
        if (this.searchInput.length < 4 && !this.subjectInput && !this.searchComponent) {
            return;
        }

        this.filteredCourses = this.filteredCourses.filter(item => {


            if (this.subjectInput && !this.searchComponent) {
                return item.subject === this.subjectInput;
            } else if (!this.subjectInput && this.searchComponent) {
                return item.component === this.searchComponent;
            } else if (this.subjectInput && this.searchComponent) {
                return item.subject === this.subjectInput && item.component === this.searchComponent;
            }

            return true;
        });


        const searcher = new FuzzySearch(this.filteredCourses, ['component', 'name', 'id', 'number', 'subject'], {
            caseSensitive: false,
            sort: true,
        });

        this.filteredCourses = searcher.search(this.searchInput);

    }

    openReviewsModal(currentCourse) {
        this.currentSelectedCourse = currentCourse;
        $('#reviews-modal').modal('show');
    }

    leaveReview() {
        const {review} = this.reviewService.form.value;
        this.reviewService.createReview(review, this.user.uid, this.user.name, this.currentSelectedCourse);
        this.reviewService.form.reset();
    }

    getReviewsForCourse() {
        return this.allReviews.filter(item => item.courseId === this.currentSelectedCourse?.$id);
    }
}
