import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { SharedModule } from '../../modules/shared/shared.module';

import { PaymentDashboardComponent } from './components/payment-dashboard/payment-dashboard.component';
import { AddressComponent } from './components/address/address.component';
import { RateplanComponent } from './components/rateplan/rateplan.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ManualPaymentComponent } from './components/manual-payment/manual-payment.component';

import { routing } from './payment.routing';
import { WelcomePaymentComponent } from './components/welcome-payment/welcome-payment.component';
// import { FailedPaymentComponent } from './components/failed-payment/failed-payment.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataTablesModule,
    routing,
    SharedModule
  ],
  declarations: [
    PaymentDashboardComponent,
    AddressComponent,
    RateplanComponent,
    PaymentComponent,
    ManualPaymentComponent,
    WelcomePaymentComponent,
    // FailedPaymentComponent
  ]
})
export class PaymentModule { }
