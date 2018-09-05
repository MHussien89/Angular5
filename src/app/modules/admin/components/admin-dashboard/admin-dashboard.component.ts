import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { UserService } from '../../../../services/user.service';
import { StorageService } from '../../../../services/storage.service';
import { RequestsService } from '../../../../services/requests.service';

import { forkJoin } from "rxjs/observable/forkJoin";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  filterQuery = "";
  rowsOnPage = 10;
  sortBy = "agent_email";
  sortOrder = "asc";
  email: string;
  currentUser: any;


  newRequestsNumber: number;
  pendingRequestsNumber: number;
  approvedRequestsNumber: number;
  rejectedRequestsNumber: number;

  constructor(private requestsService: RequestsService, private userService: UserService, private route: ActivatedRoute, private storageService: StorageService,
    private router: Router) { }

  ngOnInit() {
    // this.currentUser = this.storageService.getCurrentUserObject();
    this.currentUser = this.userService.getUserData();
    let newRequests = this.requestsService.getNewRequests();
    let pendingRequests = this.requestsService.getPendingRequests();
    let approvedRequests = this.requestsService.getApprovedRequests();
    let rejectedRequests = this.requestsService.getRejectedRequests();


    forkJoin([newRequests, pendingRequests, approvedRequests, rejectedRequests]).subscribe(results => {
      this.newRequestsNumber = results[0].users.length;
      this.pendingRequestsNumber = results[1].users.length;
      this.approvedRequestsNumber = results[2].users.length;
      this.rejectedRequestsNumber = results[3].users.length;
    }, error => {
      console.log(error);
    });

    this.requestsService.onNewLoad.subscribe(res => {
      this.newRequestsNumber = res;
    });
    this.requestsService.onPendingLoad.subscribe(res => {
      this.pendingRequestsNumber = res;
    });
    this.requestsService.onApprovedLoad.subscribe(res => {
      this.approvedRequestsNumber = res;
    });
    this.requestsService.onRejectedLoad.subscribe(res => {
      this.rejectedRequestsNumber = res;
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['../auth'], { relativeTo: this.route });
    // this.router.navigate(['/login']);
  }

}
