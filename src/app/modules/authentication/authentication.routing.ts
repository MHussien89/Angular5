import { Routes, RouterModule } from '@angular/router';

import { AuthTemplateComponent } from './components/auth-template/auth-template.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from '../../guards/auth.guard';


const authenticationRoutes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
        path: 'auth', component: AuthTemplateComponent,
        children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
            { path: 'register', component: RegisterComponent },
            { path: 'welcome', component: WelcomeComponent }
        ]
    },

    // otherwise redirect to home
    // { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forChild(authenticationRoutes);