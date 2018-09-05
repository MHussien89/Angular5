
import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';
import { RatePlan } from '../../../../models/rateplan';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { PaymentService } from '../../../../services/payment.service';

@Component({
  selector: 'app-rateplan-admin',
  templateUrl: './rateplan-admin.component.html',
  styleUrls: ['./rateplan-admin.component.css']
})
export class RateplanAdminComponent implements OnInit {

  errorMessage: string;
  successMessage: string;
  ratePlan: RatePlan;

  constructor(private paymentService: PaymentService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    this.ratePlan = new RatePlan();

    this.paymentService.getRatePlans().subscribe(
      rateplans => {
        this.ratePlan = rateplans;
      },
      error => {
        this.errorMessage = error.errorMessage;
      });

  }

  updateRatePlans() {
    this.paymentService.editRatePlans(this.ratePlan).subscribe(
      user => {
        this.successMessage = 'Rate Plans Updated Successfully';
        this.router.navigate(['/adminDashboard', 'editRatePlan']);
      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
