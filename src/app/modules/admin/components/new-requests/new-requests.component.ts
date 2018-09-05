import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../../../models/user';

import { RequestsService } from '../../../../services/requests.service';
import { OrganizationService } from '../../../../services/organization.service';

import { Subject } from 'rxjs/Subject';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';

@Component({
  selector: 'app-new-requests',
  templateUrl: './new-requests.component.html',
  styleUrls: ['./new-requests.component.css']
})
export class NewRequestsComponent implements OnInit {

  users: User[];
  successMessage: string;
  errorMessage: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private requestsService: RequestsService, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.requestsService.getNewRequests().subscribe(
      requests => {
        this.users = requests.users;
        this.rerender();
      },
      error => {
        console.log(error);
      });
  }

  acceptUsers(): void {
    let acceptedUsers: string[] = this.users.filter(user => {
      return user.organization.checkbox == true;
    }).map(user => {
      return user.organization.id;
    })
    if (acceptedUsers.length > 0) {
      this.requestsService.accept(acceptedUsers).subscribe(
        requests => {
          this.requestsService.getNewRequests().subscribe(
            requests => {
              this.errorMessage = null;
              this.successMessage = 'Users Accepted Successfully';
              this.users = requests.users;
              this.rerender();
            },
            error => {
            });
        },
        error => {
        });
    }
    else {
      this.successMessage = null;
      this.errorMessage = 'Please select user';
    }
  }

  deleteUsers(): void {
    let deletedOrganizations: string[] = this.users.filter(user => {
      return user.organization.checkbox == true;
    }).map(user => {
      return user.organization.id;
    })
    if (deletedOrganizations.length > 0) {
      this.organizationService.deleteOrganization(deletedOrganizations).subscribe(
        requests => {
          this.requestsService.getNewRequests().subscribe(
            requests => {
              this.errorMessage = null;
              this.successMessage = 'Users Deleted Successfully';
              this.users = requests.users;
              this.rerender();
            },
            error => {
            });
        },
        error => {
        });
    }
    else {
      this.successMessage = null;
      this.errorMessage = 'Please select user';
    }
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  rerender(): void {
    if (this.dtElement) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        // Destroy the table first
        dtInstance.destroy();
        // Call the dtTrigger to rerender again
        this.dtTrigger.next();
      });
    }

  }

}
