import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';
@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  errorMessage: string;
  user: User;
  users: User[];
  userId: string;
  currentUser: any;
  organization: Organization;

  constructor(private storageService: StorageService, private userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.organization = this.storageService.getOrganization();
    this.users = this.storageService.getUserList();
    // console.log(JSON.stringify(this.currentUser, undefined, 2));
    this.route.queryParams.subscribe(params => {
      this.userId = params["userId"];
      this.user = this.users.filter((user) => {
        return user.id == this.userId;
      })[0];


    });
  }

  editUser() {
    this.userService.editUser(this.user.id, this.user).subscribe(
      user => {
        if (this.currentUser.role == 'ADMIN')
          this.router.navigate(['/adminDashboard', 'userList'], { queryParams: { orgId: this.organization.id } });
        else
          this.router.navigate(['/ownerDashboard', 'userList']);
        // this.router.navigate(['/ownerDashboard']);
      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
