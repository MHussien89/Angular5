import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';
import { User } from '../models/user';
import { CONTENT_TYPES } from '../config/defines';

import { Organization } from '../models/organization';
import { environment } from '../../environments/environment';
import { Address } from '../models/address';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class OrganizationService {

    constructor(private http: HttpService) { }

    deleteOrganization(organizations: string[]) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.delete(environment.apiBase + '/admin/organization/delete', JSON.stringify({
            usersIds: organizations
        }));
    }

    getCountries() {
        return this.http.get('assets/countries.json');
    }


    editOrganization(organizationId: string, organization: Organization) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.put(environment.apiBase + '/organization/update/' + organizationId,
            JSON.stringify({
                name: organization.name,
                numberOfActiveUsers: organization.numberOfActiveUsers,
                active: organization.active,
            }), CONTENT_TYPES.JSON);
    }

    addAddress(organizationId: string, address: Address) {
        return this.http.put(environment.apiBase + '/organization/addAddress/' + organizationId,
            JSON.stringify({
                address: address.address,
                city: address.city,
                country: address.country,
                modeOfPayment: address.modeOfPayment
            }), CONTENT_TYPES.JSON);
    }

    logout() {
        localStorage.removeItem('currentUser');
    }
}