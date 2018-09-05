import { Transaction } from './transaction';
import { Agreement } from './agreement';
export class Order {
    cartid: string;
    test: string;
    amount: string;
    currency: string;
    description: string;
    ref: string;
    url: string;
    transaction: Transaction;
    agreement: Agreement
}