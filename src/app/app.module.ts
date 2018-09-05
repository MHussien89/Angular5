import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { DataTablesModule } from 'angular-datatables';

//import our modules
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { AdminModule } from './modules/admin/admin.module';
// import { SharedModule } from './modules/shared/shared.module';
import { OwnerModule } from './modules/owner/owner.module';

import { PaymentModule } from './modules/payment/payment.module';


// Components
import { AppComponent } from './app.component';
// import { LoginComponent } from './components/login/login.component';
// import { RegisterComponent } from './components/register/register.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { RequestsService } from './services/requests.service';
import { OrganizationService } from './services/organization.service';
import { StorageService } from './services/storage.service';
import { PaymentService } from './services/payment.service';
import { RouteService } from './services/route.service';

import { routing } from './app.routing';
import { AccessGuard } from './guards/access.guard';
import { AuthGuard } from './guards/auth.guard';
import { DisableDeepLinksGuard } from './guards/disable-deeplinks.guard';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    DataTablesModule,
    SharedModule,
    AuthenticationModule,
    AdminModule,
    OwnerModule,
    PaymentModule
  ],
  providers: [AccessGuard, AuthGuard, DisableDeepLinksGuard, RouteService, AuthenticationService, UserService, RequestsService, OrganizationService, StorageService, PaymentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
