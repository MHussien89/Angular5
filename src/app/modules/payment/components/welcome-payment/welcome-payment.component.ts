import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { CreditPayment } from '../../../../models/payment/credit-payment';


import { PaymentService } from '../../../../services/payment.service';
import { StorageService } from '../../../../services/storage.service';
import { UserService } from '../../../../services/user.service';
import { Payment } from '../../../../models/payment';
import { CurrentUser } from '../../../../models/current-user';

@Component({
  selector: 'app-welcome-payment',
  templateUrl: './welcome-payment.component.html',
  styleUrls: ['./welcome-payment.component.css']
})
export class WelcomePaymentComponent implements OnInit {

  transactionResult: string;
  payment: Payment;
  currentUser: CurrentUser;

  constructor(private route: ActivatedRoute, private userService: UserService, private storageService: StorageService, private router: Router,
    private paymentService: PaymentService) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    // this.payment = this.storageService.getPayment();
    this.payment = this.paymentService.getManualPayment();
    if (!this.payment) {
      this.goToLogin();
    }
    else {
      const paymentRef = this.storageService.getPaymentRef();
      if (paymentRef) {
        const creditPayment: CreditPayment = this.paymentService.preparePaymentCheckObject(paymentRef);
        this.paymentService.checkPayment(creditPayment).subscribe(
          response => {
            const paymentResponse: CreditPayment = response;
            this.transactionResult = paymentResponse.order.transaction.message;

            if (paymentResponse.order.agreement) {
              this.paymentService.addCreditPayment(this.currentUser.organizationId, this.payment).subscribe(
                user => {
                },
                error => {
                });
            } else {
              this.paymentService.addManualPayment(this.currentUser.organizationId, this.payment).subscribe(
                user => {
                },
                error => {
                });
            }
          },
          error => {
          });
      } else {
      }
    }
  }

  public goToLogin() {
    localStorage.clear();
    this.router.navigate(['../../auth'], { relativeTo: this.route });
  }

}
