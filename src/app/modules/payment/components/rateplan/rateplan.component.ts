import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';
import { Payment } from '../../../../models/payment';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';
import { PaymentService } from '../../../../services/payment.service';
import { CurrentUser } from '../../../../models/current-user';

import { RatePlan } from '../../../../models/rateplan';


declare var $: any;

@Component({
  selector: 'app-rateplan',
  templateUrl: './rateplan.component.html',
  styleUrls: ['./rateplan.component.css']
})
export class RateplanComponent implements OnInit {

  payment: Payment;
  currentUser: CurrentUser = new CurrentUser();
  errorMessage: string;

  // currentCore: number;
  // currentEnterprise: number;
  // currentOutbound: number;
  // currentRecorder: number;

  ratePlan: RatePlan = new RatePlan;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService, private storageService: StorageService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    // console.log(countriesNames);
    // this.ratePlan = new RatePlan();
    setTimeout(() => {
      $('.selectpicker').selectpicker('refresh');
    }, 150);
    this.payment = new Payment();
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.payment.numberOfCoreAgents = this.currentUser.numberOfCoreAgents;
    this.payment.numberOfEnterpriseAgents = this.currentUser.numberOfEnterpriseAgents;
    this.payment.numberOfOutboundAgents = this.currentUser.numberOfOutboundAgents;
    this.payment.numberOfRecorderAgents = this.currentUser.numberOfRecorderAgents;

    // this.currentCore = this.currentUser.numberOfCoreAgents;
    // this.currentEnterprise = this.currentUser.numberOfEnterpriseAgents;
    // this.currentOutbound = this.currentUser.numberOfOutboundAgents;
    // this.currentRecorder = this.currentUser.numberOfRecorderAgents;
    this.payment.interval = this.payment.interval ? this.payment.interval : '1';
    this.payment.numberOfMonths = this.currentUser.numberOfMonths != 0 ? this.currentUser.numberOfMonths : 1;
    // this.payment.numberOfMonths = this.currentUser. ? this.currentUser.numberOfMonths : 1;
    this.payment.startDate = this.currentUser.startDate;
    this.payment.endDate = this.currentUser.endDate;

    this.paymentService.getRatePlans().subscribe(
      rateplans => {
        this.ratePlan = rateplans;
      },
      error => {
      });
  }

  addPayment() {
    if (this.validateInputs()) {
      this.paymentService.calculateExtraFees(this.currentUser.organizationId, this.payment).subscribe(
        fee => {
          this.payment.totalCost = fee.fees;
          this.payment.freeTrial = false;
          // this.storageService.setPayment(this.payment);
          this.paymentService.setManualPayment(this.payment);
          this.router.navigate(['../payment'], { relativeTo: this.route });
        },
        error => {
        });
    }
  }

  validateInputs() {
    if (this.payment.numberOfCoreAgents < 0 ||
      this.payment.numberOfEnterpriseAgents < 0 ||
      this.payment.numberOfOutboundAgents < 0 ||
      this.payment.numberOfRecorderAgents < 0) {
      this.errorMessage = 'Invalid Inputs';
      return false;
    } else {
      if (this.payment.numberOfCoreAgents > 100 ||
        this.payment.numberOfEnterpriseAgents > 100 ||
        this.payment.numberOfOutboundAgents > 100 ||
        this.payment.numberOfRecorderAgents > 100) {
        this.errorMessage = 'Maximum number of agents is 100 per each type';
        return false;
      }
      this.errorMessage = null;
      return true;
    }
  }

  calculateExtraFees() {
    if (this.validateInputs()) {
      this.paymentService.calculateExtraFees(this.currentUser.organizationId, this.payment).subscribe(
        fee => {
          alert('Fees to pay: ' + fee.fees + ' USD');
        },
        error => {
        });
    }
  }

  submitTrial() {
    this.payment.numberOfCoreAgents = 10;
    this.payment.numberOfEnterpriseAgents = 10;
    this.payment.numberOfOutboundAgents = 10;
    this.payment.numberOfRecorderAgents = 10;
    this.payment.numberOfMonths = 1;
    this.paymentService.calculateExtraFees(this.currentUser.organizationId, this.payment).subscribe(
      fee => {
        this.payment.totalCost = fee.fees;
        this.payment.freeTrial = true;

        // this.storageService.setPayment(this.payment);
        this.paymentService.setManualPayment(this.payment);
        this.router.navigate(['../payment'], { relativeTo: this.route });
      },
      error => {
      });
  }

}
