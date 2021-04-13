import {Injectable, NgZone} from '@angular/core';
import {Router} from "@angular/router";
import firebase from 'firebase/app';
import {AngularFireAuth} from "@angular/fire/auth";
import {FormControl, FormGroup, Validators} from "@angular/forms";

import {
    AngularFirestore,
    AngularFirestoreDocument
} from "@angular/fire/firestore";

import {Observable, of} from "rxjs";
import {switchMap} from "rxjs/operators";
import {User} from "../user.model";
import {log} from "util";

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    isLoggedIn: boolean;
    user$: Observable<User>;

    registerForm = new FormGroup({
        displayName: new FormControl('', Validators.required),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', Validators.required)
    })

    constructor(public afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router, private ngZone: NgZone) {
        // the authentication state of the user
        this.user$ = this.afAuth.authState.pipe(
            // if user is defined..
            switchMap(user => {
                if (user) {
                    localStorage.setItem('user', JSON.stringify(user));

                    return this.afs.doc<User>(`users/${user.uid}`).valueChanges() // convert to observable
                } else {
                    localStorage.setItem('user', null);
                    return of(null);
                }
            })
        );

    }

    loggedIn() {
        this.user$.subscribe(res => {
            this.isLoggedIn = Boolean(res && res.uid);

            if (res && "activated" in res && !res.activated) {
                this.signOut();
                window.alert('Sorry, your account has been disabled.');
            }
        })
    }


// Sign up with email/password
    signUp(user) {
        const {email, password} = user;

        this.afAuth.createUserWithEmailAndPassword(email, password)
            .then((result) => {
                const data = {...result.user, ...user};
                // this.sendVerificationEmail().then(r => console.log(r));
                return this.updateUserData(data);
                // this.sendVerificationEmail(); // send verification email
                // this.signOut();
            }).catch((error) => {
            window.alert(error.message)
        })
    }

    // Sign in
    signIn(email, password) {
        return this.afAuth.signInWithEmailAndPassword(email, password)
            .then((result) => {
                if (result.user.emailVerified !== true) {
                    this.sendVerificationEmail();
                    window.alert('Please verify your email before you can log in. Please check your email as we just sent you another verification email.');
                    this.signOut();
                } else {
                    this.loggedIn();
                }
                return result;
            }).catch((error) => {
                window.alert(error.message)
            })
    }

    async sendVerificationEmail() {
        (await this.afAuth.currentUser).sendEmailVerification().then(() => {
            window.alert('You must verify your email before you can log in. ');
        })
    }

    async googleSignIn() {
        const provider = new firebase.auth.GoogleAuthProvider();
        const credential = await this.afAuth.signInWithPopup(provider);
        return this.updateUserData(credential.user).then(() => {
            this.loggedIn();
        });
    }

    async signOut() {
        await this.afAuth.signOut();
        this.router.navigate(['/']);
    }

    private updateUserData(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

        const data = {
            uid: user.uid,
            email: user.email,
            name: user.displayName,
            roles: {
                student: true
            }
        };

        return userRef.set(data, {merge: true});
    }

    makeAdmin(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

        const data = {
            roles: {
                student: false,
                admin: true,
            }
        };

        return userRef.set(data, {merge: true});
    }

    removeAdmin(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

        const data = {
            roles: {
                student: true,
                admin: false,
            }
        };

        return userRef.set(data, {merge: true});
    }


    enableAccount(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

        const data = {
            activated: true,
        };

        return userRef.set(data, {merge: true});
    }

    disableAccount(user) {
        // Sets user data to firestore on login
        const userRef: AngularFirestoreDocument = this.afs.doc(`users/${user.uid}`);

        const data = {
            activated: false,
        };

        return userRef.set(data, {merge: true});
    }


    private checkAuthorization(user: User, allowedRoles: string[]) {
        if (!user) {
            return false;
        }

        for (const role of allowedRoles) {
            if (user.roles[role]) {
                return true
            }
        }
        return false;
    }

    async changePassword(password: string) {
        await (await this.afAuth.currentUser).updatePassword(password)
            .then(item => {
                window.alert('Password changed successfully!');
            })
            .catch(err => {
                window.alert(err.message);
            })
    }

    isAdmin(user: User) {
        const allowed = ['admin'];
        return this.checkAuthorization(user, allowed);
    }

    isStudent(user: User) {
        const allowed = ['student']
        return this.checkAuthorization(user, allowed);
    }

    canRead(user: User): boolean {
        const allowed = ['admin', 'guest', 'student'];
        return this.checkAuthorization(user, allowed);
    }

    canEdit(user: User): boolean {
        const allowed = ['admin', 'student'];
        return this.checkAuthorization(user, allowed);
    }

    canDelete(user: User): boolean {
        const allowed = ['admin', 'student'];
        return this.checkAuthorization(user, allowed);
    }

    getUser() {

        return JSON.parse(localStorage.getItem('user'));
    }


}
