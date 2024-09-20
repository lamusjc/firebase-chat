import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class UrlService {
    public url = 'https://instaapi-lamus.herokuapp.com/';
    public username = '';
    constructor() {

    }
    setValues(username) {
        this.username = username;
    }

    getValues() {
        return {
            username: this.username
        }
    }
    getUrl() {
        return this.url;
    }

}
