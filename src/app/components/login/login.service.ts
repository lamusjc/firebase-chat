import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class LoginService {
    public isAuthenticated = false;
    constructor(private httpService: HttpService, public afAuth: AngularFireAuth) { }

    authenticate(data) {
        return this.httpService.post('login', data);
    }

    async login(email, password) {
        try {
            const result = await this.afAuth.signInWithEmailAndPassword(email, password);
            return {result, status: 200};
        } catch (error) {

            return {error, status: 500};
        }

    }

}