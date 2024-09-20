import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UrlService } from './url.service';


@Injectable({
    providedIn: 'root'
})

export class HttpService {
    constructor(private HttpClient: HttpClient, private urlService: UrlService) { }

    get(endpoint): Observable<any> {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': "application/json",
            }),
            withCredentials: true
        };

        return this.HttpClient.get(this.urlService.getUrl() + endpoint, headers);
    }

    post(endpoint, data): Observable<any> {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': "application/json",
            }),
            withCredentials: true
        };

        return this.HttpClient.post(this.urlService.getUrl() + endpoint, data, headers);
    }


    put(endpoint, data?): Observable<any> {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': "application/json",
            }),
            withCredentials: true
        };

        return this.HttpClient.put(this.urlService.getUrl() + endpoint, data, headers);
    }

    delete(endpoint): Observable<any> {
        const headers = {
            headers: new HttpHeaders({
                'Content-Type': "application/json",
            }),
            withCredentials: true
        };

        return this.HttpClient.delete(this.urlService.getUrl() + endpoint, headers);
    }

}
