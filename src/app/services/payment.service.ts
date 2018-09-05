import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { HttpService } from './http.service';
import { Payment } from '../models/payment';
import { CONTENT_TYPES } from '../config/defines';

import { environment } from '../../environments/environment';
import { RatePlan } from '../models/rateplan';
import { CreditPayment } from '../models/payment/credit-payment';
import { ReturnUrls } from '../models/payment/return-urls';
import { Repeat } from '../models/payment/repeat';
import { Order } from '../models/payment/order';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PaymentService {

  payment: Payment;

  constructor(private http: HttpService) { }

  addTrialPayment(organizationId: string, payment: Payment) {
    return this.http.post(environment.apiBase + '/user/addTrialPayment/' + organizationId,
      JSON.stringify({
        numberOfCoreAgents: payment.numberOfCoreAgents,
        numberOfEnterpriseAgents: payment.numberOfEnterpriseAgents,
        numberOfRecorderAgents: payment.numberOfRecorderAgents,
        numberOfOutboundAgents: payment.numberOfOutboundAgents,
        numberOfMonths: payment.numberOfMonths,
        supersCount: payment.supersCount,
      }), CONTENT_TYPES.JSON);
  }

  addManualPayment(organizationId: string, payment: Payment) {
    return this.http.post(environment.apiBase + '/user/addManualPayment/' + organizationId,
      JSON.stringify({
        numberOfCoreAgents: payment.numberOfCoreAgents,
        numberOfEnterpriseAgents: payment.numberOfEnterpriseAgents,
        numberOfRecorderAgents: payment.numberOfRecorderAgents,
        numberOfOutboundAgents: payment.numberOfOutboundAgents,
        numberOfMonths: payment.numberOfMonths,
        supersCount: payment.supersCount,
      }), CONTENT_TYPES.JSON);
  }

  addCreditPayment(organizationId: string, payment: Payment) {
    return this.http.post(environment.apiBase + '/user/addCreditPayment/' + organizationId,
      JSON.stringify({
        numberOfCoreAgents: payment.numberOfCoreAgents,
        numberOfEnterpriseAgents: payment.numberOfEnterpriseAgents,
        numberOfRecorderAgents: payment.numberOfRecorderAgents,
        numberOfOutboundAgents: payment.numberOfOutboundAgents,
        numberOfMonths: payment.numberOfMonths,
        supersCount: payment.supersCount,
      }), CONTENT_TYPES.JSON);
  }

  calculateExtraFees(organizationId: string, payment: Payment) {
    return this.http.post(environment.apiBase + '/user/calculateExtraFees/' + organizationId,
      JSON.stringify({
        numberOfCoreAgents: payment.numberOfCoreAgents,
        numberOfEnterpriseAgents: payment.numberOfEnterpriseAgents,
        numberOfRecorderAgents: payment.numberOfRecorderAgents,
        numberOfOutboundAgents: payment.numberOfOutboundAgents,
        numberOfMonths: payment.numberOfMonths
      }), CONTENT_TYPES.JSON);
  }

  editRatePlans(ratePlan: RatePlan) {
    return this.http.put(environment.apiBase + '/admin/rateplan',
      JSON.stringify({
        monthlyCore: ratePlan.monthlyCore,
        dailyCore: ratePlan.dailyCore,
        monthlyEnterprise: ratePlan.monthlyEnterprise,
        dailyEnterprise: ratePlan.dailyEnterprise,
        monthlyOutbound: ratePlan.monthlyOutbound,
        dailyOutbound: ratePlan.dailyOutbound,
        monthlyRecorder: ratePlan.monthlyRecorder,
        dailyRecorder: ratePlan.dailyRecorder
      }), CONTENT_TYPES.JSON);
  }

  getRatePlans() {
    return this.http.get(environment.apiBase + '/admin/rateplan');
  }

  setManualPayment(payment: Payment) {
    this.payment = payment;
  }

  getManualPayment() {
    return this.payment;
  }

  /**
   * @param  {CreditPayment} creditPayment
   */
  createRecurringPayment(creditPayment: CreditPayment) {
    return this.http.post(environment.gatewayBase + '/gateway/order.json',
      JSON.stringify({
        method: creditPayment.method,
        store: creditPayment.store,
        authkey: creditPayment.authkey,
        order: creditPayment.order,
        return: creditPayment.returnUrls,
        repeat: creditPayment.repeat
      }), CONTENT_TYPES.JSON);
  }

  checkPayment(creditPayment: CreditPayment) {
    return this.http.post(environment.gatewayBase + '/gateway/order.json',
      JSON.stringify({
        method: creditPayment.method,
        store: creditPayment.store,
        authkey: creditPayment.authkey,
        order: creditPayment.order,
      }), CONTENT_TYPES.JSON);
  }

  preparePaymentObject(totalCost: number, interval: number, recurring: boolean, trial?: boolean): CreditPayment {
    let creditPayment: CreditPayment = new CreditPayment();
    creditPayment.method = 'create';
    creditPayment.store = 19811;
    creditPayment.authkey = '3pT9g~69WQX@shfq';

    let returnUrls: ReturnUrls = new ReturnUrls();
    returnUrls.authorised = environment.appBase + '/payment/success';
    returnUrls.cancelled = environment.appBase + '/payment/payment';
    returnUrls.declined = environment.appBase + '/payment/declined';

    if (recurring) {
      let repeat: Repeat = new Repeat();
      repeat.period = 'M';
      repeat.start = 'next';
      repeat.term = 0;
      repeat.amount = totalCost;
      repeat.interval = interval;
      creditPayment.repeat = repeat;
    }


    let order: Order = new Order();
    order.cartid = '78990';
    order.test = environment.paymentMode;
    if (trial)
      order.amount = '1';
    else
      order.amount = String(totalCost);
    order.currency = 'USD';

    // creditPayment.order = 
    creditPayment.returnUrls = returnUrls;

    creditPayment.order = order;

    return creditPayment;
  }

  preparePaymentCheckObject(ref: string): CreditPayment {
    let creditPayment: CreditPayment = new CreditPayment();
    creditPayment.method = 'check';
    creditPayment.store = 19811;
    creditPayment.authkey = '3pT9g~69WQX@shfq';

    let order: Order = new Order();
    order.ref = ref;

    creditPayment.order = order;

    return creditPayment;
  }

  /**
   * @param  {CreditPayment} creditPayment
   */
  createOnetimePayment(creditPayment: CreditPayment) {
    return this.http.post(environment.gatewayBase + '/gateway/order.json',
      JSON.stringify({
        method: creditPayment.method,
        store: creditPayment.store,
        authkey: creditPayment.authkey,
        order: creditPayment.order,
        return: creditPayment.returnUrls
      }), CONTENT_TYPES.JSON);
  }

}
