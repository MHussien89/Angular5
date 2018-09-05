import { Routes, RouterModule } from '@angular/router';

import { PaymentDashboardComponent } from './components/payment-dashboard/payment-dashboard.component';
import { AddressComponent } from './components/address/address.component';
import { RateplanComponent } from './components/rateplan/rateplan.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ManualPaymentComponent } from './components/manual-payment/manual-payment.component';
import { WelcomePaymentComponent } from './components/welcome-payment/welcome-payment.component';

import { AccessGuard } from '../../guards/access.guard';
import { DisableDeepLinksGuard } from '../../guards/disable-deeplinks.guard';

const authenticationRoutes: Routes = [
    {
        path: '', redirectTo: 'payment', pathMatch: 'full'
    },
    {
        path: 'payment', component: PaymentDashboardComponent, canActivate: [AccessGuard],
        children: [
            { path: '', redirectTo: 'address', pathMatch: 'full' },
            { path: 'address', component: AddressComponent },
            { path: 'rateplan', component: RateplanComponent },
            { path: 'payment', component: PaymentComponent, canActivate: [DisableDeepLinksGuard] },
            { path: 'manualPayment', component: ManualPaymentComponent, canActivate: [DisableDeepLinksGuard] },
            { path: 'success', component: WelcomePaymentComponent }
        ]
    }

    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(authenticationRoutes);