import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { User } from '../../../../models/user';
import { Organization } from '../../../../models/organization';

import { UserService } from '../../../../services/user.service';
import { OrganizationService } from '../../../../services/organization.service';
import { StorageService } from '../../../../services/storage.service';
import { CurrentUser } from '../../../../models/current-user';
import { Address } from '../../../../models/address';

declare var $: any;

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {

  address: Address;
  // organizationId: string;
  errorMessage: string;
  currentUser: CurrentUser;
  countries: string[];



  constructor(private route: ActivatedRoute, private userService: UserService, private storageService: StorageService, private organizationService: OrganizationService,
    private router: Router) { }

  ngOnInit() {
    this.address = new Address();
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.address.city = this.currentUser.city;
    this.address.address = this.currentUser.address;
    this.address.country = this.currentUser.country;
    this.organizationService.getCountries().subscribe(
      countries => {
        this.countries = countries.map((country) => {
          return country.name.common;
        })
        // console.log(countriesNames);
        setTimeout(() => {
          $('.selectpicker').selectpicker('refresh');
        }, 150);
      },
      error => {
        // this.errorMessage = error.json().response.errorMessage;
      });
  }

  addAddress() {
    // this.loading = true;
    this.storageService.setAddress(this.address);
    this.router.navigate(['../rateplan'], { relativeTo: this.route });
    // this.router.navigate(['/paymentDashboard', 'rateplan']);
  }

}
