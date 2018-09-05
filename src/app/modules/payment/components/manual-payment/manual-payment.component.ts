import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { PaymentService } from '../../../../services/payment.service';
import { StorageService } from '../../../../services/storage.service';
import { UserService } from '../../../../services/user.service';
import { Payment } from '../../../../models/payment';
import { CurrentUser } from '../../../../models/current-user';


@Component({
  selector: 'app-manual-payment',
  templateUrl: './manual-payment.component.html',
  styleUrls: ['./manual-payment.component.css']
})
export class ManualPaymentComponent implements OnInit {

  orderDetails: string;
  payment: Payment;
  currentUser: CurrentUser;

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router, private storageService: StorageService, private paymentService: PaymentService) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.payment = this.paymentService.getManualPayment();
    // if (!this.payment) {
    //   this.payment = this.storageService.getPayment();
    // }
    let coreAgents = 'Package Type Selected: CC Core \nNumber Of Active Agents:' + this.payment.numberOfCoreAgents + '\n \n';
    let enterpriseAgents = 'Package Type Selected: CC Enterprise \nNumber Of Active Agents:' + this.payment.numberOfEnterpriseAgents + '\n \n';
    let recorderAgents = 'Package Type Selected: CC Recorder \nNumber Of Active Agents:' + this.payment.numberOfRecorderAgents + '\n \n';
    let outboundAgents = 'Package Type Selected: CC Outbound \nNumber Of Active Agents:' + this.payment.numberOfOutboundAgents + '\n \n';
    let totalCost = 'Total Cost: ' + this.payment.totalCost + '$ for ' + this.payment.numberOfMonths + 'month/s';
    this.orderDetails = coreAgents + enterpriseAgents + recorderAgents + outboundAgents + totalCost;
    if (this.payment.freeTrial)
      this.orderDetails = this.orderDetails + ' [Free First Month]';
  }

  AddPayment() {
    if (this.payment.freeTrial) {
      this.paymentService.addTrialPayment(this.currentUser.organizationId, this.payment).subscribe(
        user => {
          this.router.navigate(['../success'], { relativeTo: this.route });
        },
        error => {
        });
    } else {
      this.paymentService.addManualPayment(this.currentUser.organizationId, this.payment).subscribe(
        user => {
          this.router.navigate(['../success'], { relativeTo: this.route });
        },
        error => {
        });
    }
  }

  AddTrial() {
    this.paymentService.addManualPayment(this.currentUser.organizationId, this.payment).subscribe(
      user => {
        this.router.navigate(['../success'], { relativeTo: this.route });
      },
      error => {
      });
  }

}
