import { Organization } from '../models/organization';
export class User {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    userName: string;
    email: boolean;
    password: string;
    confirmPassword: string;
    phone: string;
    primaryUser: string;

    roleKey: string;
    active: boolean;
    organization: Organization;
    checkbox: boolean;
    timeZone: string;
    organizationName: string;
    updated: boolean;
}