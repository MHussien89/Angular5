import { Component, OnInit, ViewChild, AfterViewInit, ViewChildren } from '@angular/core';

import { User } from '../../../../models/user';

import { RequestsService } from '../../../../services/requests.service';
import { OrganizationService } from '../../../../services/organization.service';

import { Subject } from 'rxjs/Subject';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';

// import { MyDataTableDirective } from '../../../shared/directives/data-table.directive';


import { forkJoin } from "rxjs/observable/forkJoin";
import { reject } from 'q';

@Component({
  selector: 'app-approved-requests',
  templateUrl: './approved-requests.component.html',
  styleUrls: ['./approved-requests.component.css']
})
export class ApprovedRequestsComponent implements AfterViewInit {

  users: User[];
  successMessage: string;
  errorMessage: string;
  // @ViewChildren(MyDataTableDirective) dataTablee: MyDataTableDirective;


  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private requestsService: RequestsService, private organizationService: OrganizationService) { }


  ngOnInit() {
    this.requestsService.getApprovedRequests().subscribe(
      requests => {
        this.users = requests.users;
        this.rerender();
        // console.log(JSON.stringify(this.users, undefined, 2));
        // this.rerender();
      },
      error => {
        console.log(error);
        // this.errorMessage = 'Cannot Load List Of Users';
        // this.loading = false;
      });
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
          let approvedRequests = this.requestsService.getApprovedRequests();
          let rejectedRequests = this.requestsService.getRejectedRequests();
          forkJoin([approvedRequests, rejectedRequests]).subscribe(results => {
            this.errorMessage = null;
            this.successMessage = 'Users Rejected Successfully';
            this.users = results[0].users;
            this.rerender();
          }, error => {
            console.log(error);
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


  renewUsers(): void {
    let renewalUsers: string[] = this.users.filter(user => {
      return user.organization.checkbox == true;
    }).map(user => {
      return user.id;
    })
    if (renewalUsers.length > 0) {
      this.requestsService.renew(renewalUsers).subscribe(
        requests => {
          this.requestsService.getApprovedRequests().subscribe(
            results => {
              this.errorMessage = null;
              this.successMessage = 'Users Renewed Successfully';
              this.users = results.users;
              this.rerender();
            },
            error => {
              console.log(error);
            });
        },
        error => {
          console.log(error);
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
    });
    if (deletedOrganizations.length > 0) {
      this.organizationService.deleteOrganization(deletedOrganizations).subscribe(
        requests => {
          this.requestsService.getApprovedRequests().subscribe(
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
