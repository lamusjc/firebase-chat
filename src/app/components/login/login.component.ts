import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UrlService } from 'src/app/services/url.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
    form: any;
    constructor(private formBuilder: FormBuilder, private loginService: LoginService, private urlService: UrlService, private snackBar: MatSnackBar, private router: Router) {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        })
    }

    ngOnInit() {

    }

    login() {
        this.snackBar.open('Loding!', 'Info', {
            duration: 999999,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });

        this.loginService.login(this.form.value.email, this.form.value.password).then(res => {
            if (res.status == 500) {
                this.snackBar.open(res.error.message, 'ERROR', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
            } else {
                this.snackBar.open('Logeado', 'OK', {
                    duration: 3000,
                    horizontalPosition: 'center',
                    verticalPosition: 'top'
                });
                this.urlService.setValues(this.form.value.email);
                this.router.navigate(['/home/chat']);
            }
        })
    }
}