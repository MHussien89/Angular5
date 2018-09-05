import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { MaterialModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { XHRBackend, RequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// import { httpServiceFactory } from '../../factories/http-service.factory';

// import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('access_token');
}


import { DataTablesModule } from 'angular-datatables';
import { HttpService } from '../../services/http.service';
import { JwtHelperService } from '../../services/jwt/jwthelper.service';

// import { UsersListComponent } from './components/users-list/users-list.component';
import { EditUserComponent } from './components/edit-user/edit-user.component';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderService } from '../../services/loader.service';
import { CustotmHttpInterceptor } from '../../services/http.interceptor';
import { MyDataTableDirective } from './directives/data-table.directive';


@NgModule({
  imports: [
    CommonModule,
    DataTablesModule,
    FormsModule,
    RouterModule,
    HttpClientModule
    // JwtModule.forRoot({
    //   config: {
    //     tokenGetter: tokenGetter,
    //     whitelistedDomains: ['http://localhost:8080'],
    //     blacklistedRoutes: []
    //   }
    // })
  ],
  declarations: [
    // UsersListComponent,
    EditUserComponent,
    LoaderComponent,
    MyDataTableDirective
  ],
  exports: [
    // UsersListComponent,
    EditUserComponent,
    LoaderComponent,
    MyDataTableDirective
  ],
  providers: [
    LoaderService, HttpService, JwtHelperService, {
      provide: HTTP_INTERCEPTORS,
      useClass: CustotmHttpInterceptor,
      multi: true
    }
  ]
})
export class SharedModule { }
