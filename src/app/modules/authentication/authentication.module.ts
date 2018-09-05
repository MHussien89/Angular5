import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

import { routing } from './authentication.routing';
import { AuthTemplateComponent } from './components/auth-template/auth-template.component';
import { WelcomeComponent } from './components/welcome/welcome.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    routing
  ],
  declarations: [LoginComponent, RegisterComponent, AuthTemplateComponent, WelcomeComponent]
})
export class AuthenticationModule { }
