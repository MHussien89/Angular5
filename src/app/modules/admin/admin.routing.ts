import { Routes, RouterModule } from '@angular/router';

import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';
import { RejectedRequestsComponent } from './components/rejected-requests/rejected-requests.component';
import { NewRequestsComponent } from './components/new-requests/new-requests.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { RateplanAdminComponent } from './components/rateplan-admin/rateplan-admin.component';

// import { UsersListComponent } from '../shared/components/users-list/users-list.component';
import { EditUserComponent } from '../shared/components/edit-user/edit-user.component';


import { AccessGuard } from '../../guards/access.guard';

const adminRoutes: Routes = [
    {
        path: '', redirectTo: 'admin', pathMatch: 'full'
    },
    {
        path: 'admin', component: AdminDashboardComponent, canActivate: [AccessGuard],
        children: [
            { path: '', redirectTo: 'newRequests', pathMatch: 'full' },
            { path: 'pendingRequests', component: PendingRequestsComponent },//admin
            { path: 'approvedRequests', component: ApprovedRequestsComponent },//admin
            { path: 'rejectedRequests', component: RejectedRequestsComponent },//admin
            { path: 'newRequests', component: NewRequestsComponent },//admin
            // { path: 'userList', component: UsersListComponent },//shared
            { path: 'editOrganization', component: EditOrganizationComponent },//admin
            { path: 'editUser', component: EditUserComponent },//shared
            { path: 'addAdmin', component: AddAdminComponent }, //admin
            { path: 'adminList', component: AdminListComponent }, //admin
            { path: 'addOrganization', component: AddOrganizationComponent }, //admin
            { path: 'editRatePlan', component: RateplanAdminComponent } //admin
        ]
    },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(adminRoutes);