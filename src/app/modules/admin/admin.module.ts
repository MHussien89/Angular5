import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../modules/shared/shared.module';


import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { NewRequestsComponent } from './components/new-requests/new-requests.component';
import { PendingRequestsComponent } from './components/pending-requests/pending-requests.component';
import { ApprovedRequestsComponent } from './components/approved-requests/approved-requests.component';
import { RejectedRequestsComponent } from './components/rejected-requests/rejected-requests.component';
import { RateplanAdminComponent } from './components/rateplan-admin/rateplan-admin.component';
import { AddOrganizationComponent } from './components/add-organization/add-organization.component';
import { AdminListComponent } from './components/admin-list/admin-list.component';
import { AddAdminComponent } from './components/add-admin/add-admin.component';
import { EditOrganizationComponent } from './components/edit-organization/edit-organization.component';



import { routing } from './admin.routing';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    routing,
    SharedModule
  ],
  declarations: [
    AdminDashboardComponent,
    NewRequestsComponent,
    PendingRequestsComponent,
    ApprovedRequestsComponent,
    RejectedRequestsComponent,
    RateplanAdminComponent,
    AddOrganizationComponent,
    AdminListComponent,
    AddAdminComponent,
    EditOrganizationComponent
  ]
})
export class AdminModule { }
