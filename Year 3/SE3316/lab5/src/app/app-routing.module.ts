import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {SearchCoursesComponent} from "./search-courses/search-courses.component";
import {LoginComponent} from "./login/login.component";
import {HomeComponent} from "./home/home.component";
import {AboutComponent} from './about/about.component';
import {CreateCourseListComponent} from "./create-course-list/create-course-list.component";
import {AuthGuard} from "./services/auth/auth.guard";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RegisterComponent} from "./register/register.component";
import {EmailVerifiedGuard} from "./services/email-verified.guard";
import {VerifyAccountComponent} from "./verify-account/verify-account.component";
import {SettingsComponent} from "./settings/settings.component";
import {GuestGuardGuard} from "./services/auth/guest-guard.guard";
import {AdminDashboardComponent} from "./admin-dashboard/admin-dashboard.component";
import {AdminGuard} from "./services/auth/admin.guard";
import {AdminUsersComponent} from "./admin-users/admin-users.component";
import {AdminReviewsComponent} from "./admin-reviews/admin-reviews.component";
import {AdminPrivacyPolicyComponent} from "./admin-privacy-policy/admin-privacy-policy.component";
import {AdminDmcaPolicyComponent} from "./admin-dmca-policy/admin-dmca-policy.component";
import {AdminAupPolicyComponent} from "./admin-aup-policy/admin-aup-policy.component";
import {PolicyPagesComponent} from "./policy-pages/policy-pages.component";

const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent, canActivate: [GuestGuardGuard]},
    {path: 'register', component: RegisterComponent, canActivate: [GuestGuardGuard]},
    {path: 'about', component: AboutComponent},
    {path: 'policies/:page', component: PolicyPagesComponent},
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [AdminGuard],
        children: [
            {path: 'users', component: AdminUsersComponent},
            {path: 'reviews', component: AdminReviewsComponent},
            {path: 'privacy-policy', component: AdminPrivacyPolicyComponent},
            {path: 'dmca-policy', component: AdminDmcaPolicyComponent},
            {path: 'aup-policy', component: AdminAupPolicyComponent}
        ]

    },
    // {path: 'all-users', component: AdminUsersComponent, canActivate: [AdminGuard]},
    // {path: 'all-reviews', component: AdminReviewsComponent, canActivate: [AdminGuard]},
    {path: 'browse', component: SearchCoursesComponent},
    {path: 'verify-account', component: VerifyAccountComponent},
    {path: 'settings', component: SettingsComponent},
    {path: 'dashboard', component: DashboardComponent, canActivate: [EmailVerifiedGuard, AuthGuard]},
    {path: 'courses', component: CreateCourseListComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo: 'home'}
    // {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
