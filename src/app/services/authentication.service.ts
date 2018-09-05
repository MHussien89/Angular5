import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpErrorResponse } from '@angular/common/http';
import { HttpService } from './http.service';

import { User } from '../models/user';
import { CONTENT_TYPES } from '../config/defines';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

    currentUser: User;

    constructor(private http: HttpService) { }

    login(username: string, password: string) {
        return this.http.post(environment.apiBase + '/user/login', JSON.stringify({ username: username, password: password }), CONTENT_TYPES.JSON);
    }

    register(model: User) {
        return this.http.post(environment.apiBase + '/user/register',
            JSON.stringify({
                firstName: model.firstName, lastName: model.lastName,
                email: model.email, phone: model.phone, password: model.password,
                timeZone: model.timeZone,
                organizationName: model.organizationName,
                userName: model.userName
            }), CONTENT_TYPES.JSON);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }

    errorHandler(error: HttpErrorResponse) {
        return Observable.throw(error || 'Server Error');
    }
}