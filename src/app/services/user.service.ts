import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';
import { CONTENT_TYPES } from '../config/defines';

import { User } from '../models/user';
import { CurrentUser } from '../models/current-user';
import { Organization } from '../models/organization';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {

    organizationId: string;
    users: User[];
    user: User;

    CURRENTUSER: CurrentUser;

    constructor(private http: HttpService) { }

    setUserData(userData: CurrentUser): void {
        // console.info(JSON.stringify(userData, undefined, 2));
        this.CURRENTUSER = userData;
    }

    getUserData(): CurrentUser {
        return this.CURRENTUSER;
    }

    fillUserData(data: any) {
        this.user = new User;
        this.user.id = data.userId;
        this.user.firstName = data.firstName;
        this.user.lastName = data.lastName;
        this.user.email = data.email;
        this.user.active = data.active;

        this.organizationId = data.organizationId;
    }

    getTimezoneList() {
        return this.http.get(environment.apiBase + '/admin/timezone');
    }

    getUsersList(organizationId: string) {
        return this.http.get(environment.apiBase + '/admin/usersList/' + organizationId);
    }

    getAdminsList() {
        return this.http.get(environment.apiBase + '/admin/adminList');
    }

    loadUserData() {
        return this.http.get(environment.apiBase + '/user/data');
    }

    deleteUsers(users: string[]) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete(environment.apiBase + '/users/delete',
            new RequestOptions({
                headers: headers,
                body: JSON.stringify({
                    usersIds: users
                })
            }));
    }

    editUser(userId: string, user: User) {
        return this.http.put(environment.apiBase + '/user/update/' + userId,
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                active: user.active
            }), CONTENT_TYPES.JSON);
    }

    addUser(orgId: string, user: User) {
        return this.http.post(environment.apiBase + '/user/addUser/' + orgId,
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                active: user.active,
                password: user.password
            }), CONTENT_TYPES.JSON);
    }

    addAdmin(adminId: string, user: User) {
        return this.http.post(environment.apiBase + '/admin/addUser/' + adminId,
            JSON.stringify({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            }), CONTENT_TYPES.JSON);
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}