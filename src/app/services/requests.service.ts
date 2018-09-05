import { Injectable, EventEmitter } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';

import { environment } from '../../environments/environment';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { CONTENT_TYPES } from '../config/defines';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class RequestsService {

  onNewLoad = new EventEmitter<string>();
  onPendingLoad = new EventEmitter<string>();
  onApprovedLoad = new EventEmitter<string>();
  onRejectedLoad = new EventEmitter<string>();

  constructor(private http: HttpService) { }

  getPendingRequests() {
    return this.http.get<User[]>(environment.apiBase + '/admin/pendingRequests').map((users) => {
      this.onPendingLoad.emit(users.length);
      return users;
    });
  }

  getApprovedRequests() {
    return this.http.get<User[]>(environment.apiBase + '/admin/approvedRequests').map((users) => {
      this.onApprovedLoad.emit(users.length);
      return users;
    });
  }

  getRejectedRequests() {
    return this.http.get<User[]>(environment.apiBase + '/admin/rejectedRequests').map((users) => {
      this.onRejectedLoad.emit(users.length);
      return users;
    });
  }

  getNewRequests() {
    return this.http.get<User[]>(environment.apiBase + '/admin/newRequests').map((users) => {
      this.onNewLoad.emit(users.length);
      return users;
    });
  }

  approve(users: string[]) {
    return this.http.post(environment.apiBase + '/users/approve',
      JSON.stringify({
        usersIds: users
      }), CONTENT_TYPES.JSON);
  }

  renew(users: string[]) {
    return this.http.post(environment.apiBase + '/users/renew',
      JSON.stringify({
        usersIds: users
      }), CONTENT_TYPES.JSON);
  }

  suspend(users: string[]) {
    return this.http.post(environment.apiBase + '/users/suspend',
      JSON.stringify({
        usersIds: users
      }), CONTENT_TYPES.JSON);
  }

  accept(users: string[]) {
    return this.http.post(environment.apiBase + '/users/accept',
      JSON.stringify({
        usersIds: users
      }), CONTENT_TYPES.JSON);
  }

  reject(users: string[]) {
    return this.http.post(environment.apiBase + '/users/reject',
      JSON.stringify({
        usersIds: users
      }), CONTENT_TYPES.JSON);
  }

}
