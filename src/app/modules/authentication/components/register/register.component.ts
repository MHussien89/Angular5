import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../../../../services/authentication.service';
import { UserService } from '../../../../services/user.service';
import { User } from '../../../../models/user';
import { Timezone } from '../../../../models/timezone';

declare var $: any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: User = new User;
  timezones: Timezone[];
  loading = false;
  errorMessage: string;
  terms: boolean = false;

  constructor(private route: ActivatedRoute, private authenticationService: AuthenticationService, private userService: UserService,
    private router: Router) { }

  ngOnInit() {


    this.userService.getTimezoneList()
      .subscribe(
      data => {
        this.timezones = data;
        // this.model.timeZone = this.timezones[0].value;
        // console.log(JSON.stringify(this.timezones, undefined, 2));
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);

      },
      error => {
      });
  }

  print() {
    console.log(this.terms);
  }

  register() {
    if (!this.terms) {
      this.errorMessage = 'Please accept terms and condition';
      return;
    }
    this.model.timeZone = 'America/Whitehorse';
    this.authenticationService.register(this.model)
      .subscribe(
      data => {
        this.router.navigate(['../welcome'], { relativeTo: this.route });
      },
      error => {
        this.errorMessage = error.errorMessage;
      });
  }

}
