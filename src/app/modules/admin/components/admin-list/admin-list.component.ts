import { Component, OnInit, ViewChild } from '@angular/core';

import { User } from '../../../../models/user';

import { UserService } from '../../../../services/user.service';

import { Subject } from 'rxjs/Subject';
import { DataTablesModule } from 'angular-datatables';
import { DataTableDirective } from 'angular-datatables';
@Component({
  selector: 'app-admin-list',
  templateUrl: './admin-list.component.html',
  styleUrls: ['./admin-list.component.css']
})
export class AdminListComponent implements OnInit {

  users: User[];

  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject();

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.userService.getAdminsList().subscribe(
      requests => {
        this.users = requests.users;
        this.rerender();
      },
      error => {
        // this.errorMessage = 'Cannot Load List Of Users';
      });
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
