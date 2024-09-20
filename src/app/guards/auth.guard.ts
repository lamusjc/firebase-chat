import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginService } from '../components/login/login.service';
import { UrlService } from '../services/url.service';
import { map } from 'rxjs/operators';
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router, private urlService: UrlService, public afAuth: AngularFireAuth, private HttpClient: HttpClient, public loginService: LoginService) { }

    canActivate(): Observable<boolean> | boolean {
        if ((this.loginService.isAuthenticated === false)) {
            return this.afAuth.authState.pipe(map(data => {
                console.log('auth.guard');
                return true;
            }, err => {
                this.router.navigate(['login']);
                return false;
            }));
        } else if (this.loginService.isAuthenticated === true) {
            return true;
        } else {
            this.router.navigate(['login']);
            return false;
        }
    }
}