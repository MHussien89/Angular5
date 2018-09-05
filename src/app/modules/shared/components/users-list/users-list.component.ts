// import { Component, OnInit, ViewChild } from '@angular/core';
// import { Router, ActivatedRoute } from '@angular/router';

// import { User } from '../../../../models/user';

// import { UserService } from '../../../../services/user.service';
// import { StorageService } from '../../../../services/storage.service';
// // import { MyDataTableDirective } from '../../directives/data-table.directive';

// import { Subject } from 'rxjs/Subject';
// import { DataTablesModule } from 'angular-datatables';
// import { DataTableDirective } from 'angular-datatables';

// @Component({
//   selector: 'app-users-list',
//   templateUrl: './users-list.component.html',
//   styleUrls: ['./users-list.component.css']
// })
// export class UsersListComponent implements OnInit {

//   users: User[];
//   organizationId: string;
//   currentUser: any;

//   // @ViewChild(MyDataTableDirective) dataTable: MyDataTableDirective;

//   @ViewChild(DataTableDirective)
//   dtElement: DataTableDirective;

//   dtOptions: DataTables.Settings = {};
//   dtTrigger: Subject<any> = new Subject();

//   constructor(private storageService: StorageService, private userService: UserService, private route: ActivatedRoute, private router: Router) { }

//   ngOnInit() {
//     // this.currentUser = this.storageService.getCurrentUserObject();
//     this.currentUser = this.userService.getUserData();
//     // this.organizationId = this.route.snapshot.params['organizationId'] || null;
//     this.route.queryParams.subscribe(params => {
//       this.organizationId = params["orgId"];

//       if (!this.organizationId) {
//         // this.organizationId = this.userService.organizationId;
//         this.organizationId = this.currentUser.organizationId;
//       }

//       this.userService.getUsersList(this.organizationId).subscribe(
//         requests => {
//           this.users = requests.users;
//           this.storageService.setOrganization(this.users[0].organization);
//           this.storageService.setUserList(this.users);
//           // this.userService.organization = this.users[0].organization;
//           // this.userService.users = this.users;
//           this.rerender();
//         },
//         error => {
//           console.log(error);
//         });

//     });
//   }

//   deleteUsers(): void {
//     let deletedUsers: string[] = this.users.filter(user => {
//       return user.checkbox == true;
//     }).map(user => {
//       return user.id;
//     })
//     this.userService.deleteUsers(deletedUsers).subscribe(
//       requests => {
//         this.userService.getUsersList(this.organizationId).subscribe(
//           requests => {
//             this.users = requests.users;
//             this.storageService.setOrganization(this.users[0].organization);
//             this.storageService.setUserList(this.users);
//             // this.userService.organization = this.users[0].organization;
//             // this.userService.users = this.users;
//             this.rerender();
//           },
//           error => {
//           });
//       },
//       error => {
//       });
//   }

//   goToEditPage(userId: string): void {
//     if (this.currentUser.role == 'ADMIN')
//       this.router.navigate(['/adminDashboard', 'editUser'], { queryParams: { userId: userId } });
//     else
//       this.router.navigate(['/ownerDashboard', 'editUser'], { queryParams: { userId: userId } });
//   }

//   ngAfterViewInit(): void {
//     this.dtTrigger.next();
//   }

//   rerender(): void {
//     if (this.dtElement) {
//       this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
//         // Destroy the table first
//         dtInstance.destroy();
//         // Call the dtTrigger to rerender again
//         this.dtTrigger.next();
//       });
//     }

//   }

// }
