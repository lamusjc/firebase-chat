import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from './register.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as firebase from 'firebase/app';

@Component({
    selector: 'register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private snackBar: MatSnackBar, private router: Router) {
        this.form = this.formBuilder.group({
            // name: ['', Validators.required],
            // lastname: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnInit() {

    }

    register() {
        this.snackBar.open('Loding!', 'Info', {
            duration: 999999,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
        this.registerService.reg(this.form.value.email, this.form.value.password).then(res => {
            if (res.status == 500) {
                this.snackBar.open(res.error.message, 'Error!', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            } else {
                const user = firebase.database().ref('users/').push();
                user.set({ nickname: this.form.value.email });
                this.snackBar.open('Registered user!', 'OK', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this.router.navigate(['/login']);
            }
        });
    }
}