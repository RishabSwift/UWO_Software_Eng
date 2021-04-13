import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthService} from "./auth/auth.service";
import {map, take, tap} from "rxjs/operators";

@Injectable({
    providedIn: 'root'
})
export class EmailVerifiedGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) {
    }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

        if (!this.auth.getUser()?.emailVerified) {
            this.auth.signOut();
            return this.router.navigate(['/login']);
        }
        return this.auth.getUser().emailVerified;
    }

}
