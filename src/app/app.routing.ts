import { Routes, RouterModule } from '@angular/router';

const appRoutes: Routes = [
    { path: '', redirectTo: 'authenticate', pathMatch: 'full' },
    { path: 'authenticate', loadChildren: 'app/modules/authentication/authentication.module#AuthenticationModule' },
    { path: 'admin', loadChildren: 'app/modules/admin/admin.module#AdminModule' },
    { path: 'owner', loadChildren: 'app/modules/owner/owner.module#OwnerModule' },
    { path: 'payment', loadChildren: 'app/modules/payment/payment.module#PaymentModule' }
    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);