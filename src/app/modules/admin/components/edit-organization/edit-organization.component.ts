import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-edit-organization',
  templateUrl: './edit-organization.component.html',
  styleUrls: ['./edit-organization.component.css']
})
export class EditOrganizationComponent implements OnInit {

  organization: Organization = new Organization();
  errorMessage: string;

  constructor(private storageService: StorageService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    this.organization = this.storageService.getOrganization();
  }


  editOrganization() {
    this.organizationService.editOrganization(this.organization.id, this.organization).subscribe(
      user => {
        this.router.navigate(['/adminDashboard', 'userList'], { queryParams: { orgId: this.organization.id } });
      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
