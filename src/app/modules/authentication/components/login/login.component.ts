import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';
import { JwtHelperService } from '../../../../services/jwt/jwthelper.service';

import { UserService } from '../../../../services/user.service';
import { StorageService } from '../../../../services/storage.service';
import * as sha1 from 'js-sha1';

@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model: any = {};
  loading = false;
  errorMessage: string;
  successMessage: string;

  constructor(private jwtHelperService: JwtHelperService, private storageService: StorageService, private authenticationService: AuthenticationService, private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.successMessage = this.route.snapshot.queryParams['successMessage'] || null;
  }

  login() {
    this.successMessage = null;
    this.authenticationService.login(this.model.username, this.model.password)
      .subscribe(
      data => {
        // this.storageService.setCurrentUserObject(data.response.userData);
        this.userService.setUserData(data.response.userData);
        localStorage.setItem('access_token', data.response.accessToken);

        if (data.response.userData.role == 'ADMIN')
          this.router.navigate(['../../admin'], { relativeTo: this.route });
        else if (data.response.userData.accepted && !data.response.userData.active)
          this.router.navigate(['../../payment']);
        else
          this.router.navigate(['../../owner'], { relativeTo: this.route });

      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
