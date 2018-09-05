import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { AuthenticationService } from '../../../../services/authentication.service';

@Component({
  selector: 'app-add-organization',
  templateUrl: './add-organization.component.html',
  styleUrls: ['./add-organization.component.css']
})
export class AddOrganizationComponent implements OnInit {

  user: User = new User;
  errorMessage: string;

  constructor(private router: Router, private authenticationService: AuthenticationService) { }

  ngOnInit() {
  }

  addOrganization() {
    this.authenticationService.register(this.user)
      .subscribe(
      data => {
        this.router.navigate(['/adminDashboard', 'newRequests'], { queryParams: { successMessage: 'User Added Successfully' } });
      },
      error => {
        this.errorMessage = error.errorMessage;
        // this.alertService.error(error);
      });
  }

}
