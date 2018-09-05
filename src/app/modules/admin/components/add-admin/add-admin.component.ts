import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.css']
})
export class AddAdminComponent implements OnInit {

  user: User;
  errorMessage: string;

  currentUser: any;

  constructor(private storageService: StorageService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
  }

  addAdmin() {
    this.userService.addAdmin(this.currentUser.organizationId, this.user).subscribe(
      user => {
        this.router.navigate(['/adminDashboard', 'adminList']);
      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
