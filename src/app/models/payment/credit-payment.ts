
import { Order } from './order';
import { ReturnUrls } from './return-urls';
import { Repeat } from './repeat';


export class CreditPayment {

    method: string;
    store: number;
    authkey: string;
    
    order: Order;
    returnUrls: ReturnUrls;
    repeat: Repeat;
}