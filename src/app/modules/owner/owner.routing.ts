import { Routes, RouterModule } from '@angular/router';

import { UsersListComponent } from './components/users-list/users-list.component';
import { OwnerDashboardComponent } from './components/owner-dashboard/owner-dashboard.component';

import { AccessGuard } from '../../guards/access.guard';

const ownerRoutes: Routes = [
    {
        path: '', redirectTo: 'owner', pathMatch: 'full'
    },
    {
        path: 'owner', component: OwnerDashboardComponent, canActivate: [AccessGuard],
        children: [
            { path: '', redirectTo: 'userList', pathMatch: 'full' },
            { path: 'userList', component: UsersListComponent },
            // { path: 'editUser', component: EditUserComponent },
            // { path: 'addUser', component: AddUserComponent },
        ]
    },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(ownerRoutes);