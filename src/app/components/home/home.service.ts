import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { first } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class HomeService {
    constructor(private httpService: HttpService, public afAuth: AngularFireAuth) { }

    getProfile() {
        return this.afAuth.authState.pipe(first()).toPromise();
    }

    logout() {
        return this.httpService.get('logout');
    }
    async disconnect() {
        (await this.afAuth.app).database
        try {
            const result = await this.afAuth.signOut();
            return { result, status: 200 }
        } catch (error) {
            return { error, status: 500 }
        }
    }

    getAllUsers() {
        return this.httpService.get('user');
    }

}