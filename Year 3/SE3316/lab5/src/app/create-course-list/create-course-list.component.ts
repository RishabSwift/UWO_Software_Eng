import {Component, OnInit, Input} from '@angular/core';
import {ScheduleService} from "../services/schedule.service";
import {FormGroup, FormBuilder, Validators} from "@angular/forms";
import FuzzySearch from 'fuzzy-search';
import {AuthService} from "../services/auth/auth.service";

declare var $: any;


@Component({
    selector: 'app-create-course-list',
    templateUrl: './create-course-list.component.html',
    styleUrls: ['./create-course-list.component.scss']
})

export class CreateCourseListComponent implements OnInit {

    @Input() user;
    schedule: any;
    formControls = this.scheduleService.form.controls;
    searchString: string;

    selectedSchedule: any;
    // selectedScheduleCourses: any;

    @Input() allCourses = [];
    @Input() allSchedules = [];
    @Input() filteredSchedules = [];


    constructor(public scheduleService: ScheduleService, private formBuilder: FormBuilder, public auth: AuthService) {
    }

    ngOnInit(): void {
        // this.loadSchedules();
    }


    //
    // loadSchedules() {
    //     this.scheduleService.getAllSchedules().subscribe(res => {
    //         this.allSchedules = res;
    //         this.allSchedules = res.map(item => {
    //             // console.log(item);
    //             return {
    //                 // @ts-ignore
    //                 $id: item.payload.doc.id,
    //                 // @ts-ignore
    //                 ...item.payload.doc.data()
    //             };
    //         });
    //
    //         this.allSchedules = this.allSchedules.sort((a, b) => b.updated_at - a.updated_at);
    //         this.filteredSchedules = this.allSchedules;
    //     });
    // }


    onDelete(schedule) {
        this.scheduleService.deleteSchedule(schedule);
    }

    onSubmit() {

        const {$id, ...formData} = this.scheduleService.form.value;
        if (this.scheduleService.form.get('$id').value == null) {


            let alreadyExists = false;
            this.allSchedules.forEach(item => {
                if (item.name == formData.name) {
                    alreadyExists = true;
                    return;
                }
            })

            if (alreadyExists) {
                window.alert('This schedule name already exists. Please choose another!');
                return;
            }

            this.scheduleService.createSchedule(formData, this.user.uid, this.user.name);
            this.scheduleService.form.reset();

            // this.scheduleService.createSchedule(formData, this.auth.user$);
        } else {


            let alreadyExists = false;
            this.allSchedules.forEach(item => {
                if (item.name == formData.name && $id != item.$id) {
                    alreadyExists = true;
                    return;
                }
            })

            if (alreadyExists) {
                window.alert('This schedule name already exists. Please choose another!');
                return;
            }


            this.scheduleService.updateSchedule($id, formData);
            // update
        }

        $('#scheduleFormModal').modal('hide');
    }

    search() {

        if (this.searchString == "") {
            this.filteredSchedules = this.allSchedules;
        }

        const searcher = new FuzzySearch(this.allSchedules, ['name', 'description'], {
            caseSensitive: false,
            sort: true,
        });

        this.filteredSchedules = searcher.search(this.searchString);
    }


}
