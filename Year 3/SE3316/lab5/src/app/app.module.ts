import {BrowserModule} from '@angular/platform-browser';
import {environment} from "src/environments/environment";
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {AngularFireModule} from "@angular/fire";
import {AngularFirestoreModule} from "@angular/fire/firestore";

import {CoursesService} from "./shared/courses.service";
import {SearchCoursesComponent} from './search-courses/search-courses.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { AboutComponent } from './about/about.component';
import { CreateCourseListComponent } from './create-course-list/create-course-list.component';
import { AddToScheduleComponent } from './add-to-schedule/add-to-schedule.component';
import { DateAgoPipe } from './pipes/date-ago.pipe';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PublicScheduleComponent } from './public-schedule/public-schedule.component';
import { CoursesInScheduleComponent } from './courses-in-schedule/courses-in-schedule.component';
import { RegisterComponent } from './register/register.component';
import { VerifyAccountComponent } from './verify-account/verify-account.component';
import { SettingsComponent } from './settings/settings.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminUsersComponent } from './admin-users/admin-users.component';
import { AdminReviewsComponent } from './admin-reviews/admin-reviews.component';
import { AdminPrivacyPolicyComponent } from './admin-privacy-policy/admin-privacy-policy.component';
import { AdminDmcaPolicyComponent } from './admin-dmca-policy/admin-dmca-policy.component';
import { AdminAupPolicyComponent } from './admin-aup-policy/admin-aup-policy.component';
import { PolicyPagesComponent } from './policy-pages/policy-pages.component';


@NgModule({
    declarations: [
        AppComponent,
        SearchCoursesComponent,
        LoginComponent,
        HomeComponent,
        AboutComponent,
        CreateCourseListComponent,
        AddToScheduleComponent,
        DateAgoPipe,
        DashboardComponent,
        PublicScheduleComponent,
        CoursesInScheduleComponent,
        RegisterComponent,
        VerifyAccountComponent,
        SettingsComponent,
        AdminDashboardComponent,
        AdminUsersComponent,
        AdminReviewsComponent,
        AdminPrivacyPolicyComponent,
        AdminDmcaPolicyComponent,
        AdminAupPolicyComponent,
        PolicyPagesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        // firebase.initial(environment.firebaseConfig),
        FormsModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        AngularFirestoreModule,
        ReactiveFormsModule,
    ],
    providers: [CoursesService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
