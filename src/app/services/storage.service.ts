import { Injectable } from '@angular/core';
// import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { User } from '../models/user';
import { CurrentUser } from '../models/current-user';
import { Organization } from '../models/organization';
import { Address } from '../models/address';
import { Payment } from '../models/payment';
// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map'

@Injectable()
export class StorageService {

    // organization: Organization;
    // organizationId: string;
    // users: User[];
    // user: User;
    currentUser: CurrentUser;

    constructor() { }

    setUserList(users: User[]) {
        localStorage.setItem('userList', JSON.stringify(users));
    }

    getUserList() {
        return JSON.parse(localStorage.getItem('userList'));
    }

    setOrganization(organization: Organization) {
        localStorage.setItem('selectedOrganization', JSON.stringify(organization));
    }

    getOrganization() {
        return JSON.parse(localStorage.getItem('selectedOrganization'));
    }

    setAddress(address: Address) {
        localStorage.setItem('address', JSON.stringify(address));
    }

    getAddress() {
        return JSON.parse(localStorage.getItem('address'));
    }

    // setPayment(payment: Payment) {
    //     localStorage.setItem('payment', JSON.stringify(payment));
    // }

    // getPayment() {
    //     return JSON.parse(localStorage.getItem('payment'));
    // }

    setPaymentRef(ref: string) {
        localStorage.setItem('paymentRef', ref);
    }

    getPaymentRef() {
        return localStorage.getItem('paymentRef');
    }

    removeKey(key: string) {
        localStorage.removeItem(key);
    }

    // setCurrentUserObject(loggedInData: any) {
    //     this.currentUser = {
    //         id: loggedInData.userId,
    //         firstName: loggedInData.firstName,
    //         lastName: loggedInData.lastName,
    //         userName: loggedInData.userName,
    //         organizationName: loggedInData.organizationName,
    //         netLogicPassword: loggedInData.netLogicPassword,
    //         email: loggedInData.email,
    //         active: loggedInData.active,
    //         role: loggedInData.role,
    //         organizationId: loggedInData.organizationId,
    //         accepted: loggedInData.accepted,
    //         phone: loggedInData.phone,
    //         address: loggedInData.address,
    //         city: loggedInData.city,
    //         country: loggedInData.country,
    //         numberOfCoreAgents: loggedInData.numberOfCoreAgents,
    //         numberOfEnterpriseAgents: loggedInData.numberOfEnterpriseAgents,
    //         numberOfRecorderAgents: loggedInData.numberOfRecorderAgents,
    //         numberOfOutboundAgents: loggedInData.numberOfOutboundAgents,
    //         numberOfMonths: loggedInData.numberOfMonths,
    //         totalCost: loggedInData.totalCost,
    //         startDate: loggedInData.startDate,
    //         endDate: loggedInData.endDate
    //     };
    //     localStorage.setItem('currentUserObject', JSON.stringify(this.currentUser));
    // }

    // getCurrentUserObject() {
    //     return JSON.parse(localStorage.getItem('currentUserObject'));
    // }

    // fillUserData(data: any) {
    //     this.user = new User;
    //     this.user.id = data.userId;
    //     this.user.firstName = data.firstName;
    //     this.user.lastName = data.lastName;
    //     this.user.email = data.email;
    //     this.user.active = data.active;

    //     this.organizationId = data.organizationId;
    // }


}