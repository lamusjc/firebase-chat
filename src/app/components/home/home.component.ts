import { Component, OnInit } from '@angular/core';
import { HomeService } from './home.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { UrlService } from 'src/app/services/url.service';
import * as firebase from 'firebase';
export const snapshotToArray = (snapshot: any) => {
    const returnArr = [];

    snapshot.forEach((childSnapshot: any) => {
        const item = childSnapshot.val();
        item.key = childSnapshot.key;
        returnArr.push(item);
    });

    return returnArr;
};
@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
    data: any = {
        username: '',
        users_id: '',
        name: '',
        lastname: '',
        users_photo: null
    };

    users = [];

    form: FormGroup;
    filteredOptions: Observable<string[]>;
    options: any = [];
    constructor(private homeService: HomeService, private router: Router, private urlService: UrlService, private formBuilder: FormBuilder) {
        this.form = this.formBuilder.group({
            myControl: new FormControl()
        });
    }
    ngOnInit() {
        this.getProfile();

        firebase.database().ref('users/').on('value', resp => {
            this.users = [];
            this.users = snapshotToArray(resp);
            var array = [];
            this.users.map((value, i) => {
                if (value.nickname !== this.data.username) {
                    array.push(value);
                }
            })
            this.options = array;
            console.log(array);
            this.filteredOptions = this.form.get('myControl').valueChanges.pipe(
                startWith(''),
                map(value => this._filter(value))
            );
        });
    }

    async getProfile() {
        const res = await this.homeService.getProfile();
        if (res) {
            this.data.username = res.email;
            console.log(res, 'user');
        }
    }

    logout() {
        this.homeService.disconnect().then(res => {
            if (res.status == 500) {
                this.urlService.setValues(''); this.router.navigate(['login']);
            } else {
                this.urlService.setValues(''); this.router.navigate(['login'])
            }
        });
    }

    navigate(id) {
        this.router.navigate(['/home/user/' + id]);
    }

    navigateThis(user): any {
        this.router.navigate(['/home/chat_users/' + user]);
    }


    private _filter(value: any): any {
        const filterValue = value.toLowerCase();
        return this.options.filter((option: any) => option.nickname.toLowerCase().indexOf(filterValue) !== -1);
    }
}