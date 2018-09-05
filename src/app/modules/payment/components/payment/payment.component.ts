import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';
import { PaymentService } from '../../../../services/payment.service';
import { CurrentUser } from '../../../../models/current-user';
import { Address } from '../../../../models/address';
import { Payment } from '../../../../models/payment';

import * as sha1 from 'js-sha1';
import { forkJoin } from "rxjs/observable/forkJoin";


import { CreditPayment } from '../../../../models/payment/credit-payment';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  organization: Organization;
  organizationId: string;
  errorMessage: string;
  currentUser: CurrentUser;
  address: Address;
  payment: Payment;
  hashcode: string;
  currentTime: number;

  constructor(private route: ActivatedRoute, private storageService: StorageService, private userService: UserService, private organizationService: OrganizationService,
    private router: Router, private paymentService: PaymentService) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.address = this.storageService.getAddress();

    this.payment = this.paymentService.getManualPayment();
    // if (!this.payment) {
    //   this.payment = this.storageService.getPayment();
    // }

    // this.currentTime = Math.floor(new Date().getTime() / 1000);
    // this.hashcode = sha1(`WD3x3dwz4k:19811:${this.payment.totalCost}:AED:1:${this.currentTime}:ABC123:Items:none`)
    // console.log(sha1(`hashcode is: ${this.hashcode}`));
  }

  manualPayment() {
    if (!this.address) {
      this.router.navigate(['../manualPayment'], { relativeTo: this.route });
    }
    this.address.modeOfPayment = 'MANUAL';
    this.organizationService.addAddress(this.currentUser.organizationId, this.address).subscribe(
      user => {
        this.router.navigate(['../manualPayment'], { relativeTo: this.route });
      },
      error => {
        this.errorMessage = error.errorMessage;
      });

  }

  public showNotification(event) {
    const dialogText = 'Your data will be lost!';
    event.returnValue = dialogText;

    return dialogText;
  }

  creditPayment() {
    if (!this.address) {
      const paymentObject = this.paymentService.preparePaymentObject(this.payment.totalCost, this.payment.numberOfMonths, false);
      paymentObject.order.description = 'Onetime transaction for organization: ' + this.currentUser.organizationName;
      paymentObject.order.cartid = String(Math.random()) + this.currentUser.organizationId;
      this.paymentService.createOnetimePayment(paymentObject).subscribe(
        response => {
          const order = response.order;
          this.storageService.setPaymentRef(order.ref);
          // window.open(
          //   order.url,
          //   '_blank' // <- This is what makes it open in a new window.
          // );
          sessionStorage.setItem('order_url', order.url);
          window.removeEventListener('beforeunload', this.showNotification);
          window.location.href = order.url;
        },
        error => {
          console.log('Error Happened');
          this.errorMessage = error.errorMessage;
        });
    }
    else {
      this.address.modeOfPayment = 'CREDIT';
      const paymentObject = this.paymentService.preparePaymentObject(this.payment.totalCost, this.payment.numberOfMonths, true, this.payment.freeTrial);
      paymentObject.order.description = 'Recurring transaction for organization: ' + this.currentUser.organizationName;
      paymentObject.order.cartid = String(Math.random()) + this.currentUser.organizationId;
      let addAddressCall = this.organizationService.addAddress(this.currentUser.organizationId, this.address);
      let creditPaymentCall = this.paymentService.createRecurringPayment(paymentObject);

      forkJoin([addAddressCall, creditPaymentCall]).subscribe(results => {
        const order = results[1].order;
        this.storageService.setPaymentRef(order.ref);
        // window.open(
        //   order.url,
        //   '_blank' // <- This is what makes it open in a new window.
        // );
        sessionStorage.setItem('order_url', order.url);
        window.removeEventListener('beforeunload', this.showNotification);
        window.location.href = order.url;
      }, error => {
      });
    }




  }

}
