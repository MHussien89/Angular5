import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../modules/shared/shared.module';

import { UsersListComponent } from './components/users-list/users-list.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';

import { routing } from './owner.routing';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    routing,
    SharedModule
  ],
  declarations: [OwnerDashboardComponent, UsersListComponent]
})
export class OwnerModule { }
