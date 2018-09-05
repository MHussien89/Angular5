import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../../../models/user';

import { RequestsService } from '../../../../services/requests.service';
import { OrganizationService } from '../../../../services/organization.service';

import { Subject } from 'rxjs/Subject';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';

import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-pending-requests',
  templateUrl: './pending-requests.component.html',
  styleUrls: ['./pending-requests.component.css']
})
export class PendingRequestsComponent implements OnInit {

  users: User[];
  successMessage: string;
  errorMessage: string;

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private requestsService: RequestsService, private organizationService: OrganizationService) { }

  ngOnInit() {
    this.requestsService.getPendingRequests().subscribe(
      requests => {
        this.users = requests.users;
        this.rerender();
      },
      error => {
      });
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  approveUsers(): void {
    let approvedUsers: string[] = this.users.filter(user => {
      return user.organization.checkbox == true;
    }).map(user => {
      return user.id;
    });

    if (approvedUsers.length > 0) {
      this.requestsService.approve(approvedUsers).subscribe(
        requests => {
          let approvedRequests = this.requestsService.getApprovedRequests();
          let pendingRequests = this.requestsService.getPendingRequests();
          forkJoin([approvedRequests, pendingRequests]).subscribe(
            results => {
              this.errorMessage = null;
              this.successMessage = 'Users Approved Successfully';
              this.users = results[1].users;
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

  rejectUsers(): void {
    let rejectedUsers: string[] = this.users.filter(user => {
      return user.organization.checkbox == true;
    }).map(user => {
      return user.id;
    })

    if (rejectedUsers.length > 0) {
      this.requestsService.reject(rejectedUsers).subscribe(
        requests => {
          let pendingRequests = this.requestsService.getPendingRequests();
          let rejectedRequests = this.requestsService.getRejectedRequests();
          forkJoin([pendingRequests, rejectedRequests]).subscribe(results => {
            this.errorMessage = null;
            this.successMessage = 'Users Rejected Successfully';
            this.users = results[0].users;
            this.rerender();
          }, error => {
          });
        },
        error => {
        });
    }
    else {
      this.successMessage = null;
      this.errorMessage = 'Please select users';
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
          this.requestsService.getPendingRequests().subscribe(
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
      this.errorMessage = 'Please select users';
    }
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
