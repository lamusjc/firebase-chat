import { Injectable } from "@angular/core";
import { HttpService } from '../../services/http.service'
import { auth } from 'firebase/app';
import { User } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})

export class RegisterService {
    public user: User;
    constructor(private httpService: HttpService, public afAuth: AngularFireAuth) { }

    register(data) {
        return this.httpService.post('register', data);
    }

    async reg(email, password) {
        try {
            const result = await this.afAuth.createUserWithEmailAndPassword(email, password);
            return {result, status: 200};
        } catch (error) {
            return {error, status: 500};
        }

    }

}