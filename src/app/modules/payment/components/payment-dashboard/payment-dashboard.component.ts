import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';

@Component({
  selector: 'app-payment-dashboard',
  templateUrl: './payment-dashboard.component.html',
  styleUrls: ['./payment-dashboard.component.css']
})
export class PaymentDashboardComponent implements OnInit {

  user: User;
  errorMessage: string;

  currentUser: any;

  constructor(private route: ActivatedRoute, private storageService: StorageService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    this.user = new User();
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../auth'], { relativeTo: this.route });
  }

}
