import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CurrentUser } from '../../../../models/current-user';
import { StorageService } from '../../../../services/storage.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-owner-dashboard',
  templateUrl: './owner-dashboard.component.html',
  styleUrls: ['./owner-dashboard.component.css']
})
export class OwnerDashboardComponent implements OnInit {

  currentUser: CurrentUser;
  netLogicURL: string = '';

  constructor(private route: ActivatedRoute,private userService: UserService, private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    this.netLogicURL = 'http://95.177.208.114:90/LoginAuth?UserName=' + this.currentUser.userName + '&ProjectName=' + this.currentUser.organizationName + '&Password=' + this.currentUser.netLogicPassword;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../auth'], { relativeTo: this.route });
  }

}
