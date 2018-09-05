import { Injectable } from '@angular/core';
import { StorageService } from '../services/storage.service';
import { UserService } from '../services/user.service';

import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { CurrentUser } from '../models/current-user';
import { Route } from '../models/route';
import { config } from '../config/pages-config';
import { Observable } from 'rxjs/Observable';
import { RouteService } from '../services/route.service';


@Injectable()
export class AccessGuard implements CanActivate {

    currentUser: CurrentUser;

    constructor(private routeService: RouteService, private storageService: StorageService, private router: Router, private userService: UserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.currentUser = this.userService.getUserData();
        return Observable.create(
            (observer) => {
                // const targetRoute: any = {};
                const targetRoute = this.routeService.getRoute('/' + route.url[0].path);
                if (this.currentUser) {
                    if (this.currentUser.role === targetRoute.accessLevel)
                        observer.next(true);
                    else {
                        this.router.navigate(['/auth']);
                        observer.next(false);
                    }
                }
                else if (localStorage.getItem('access_token')) {
                    this.userService.loadUserData()
                        .subscribe(
                        (data) => {
                            this.userService.setUserData(data.response.userData);
                            this.currentUser = this.userService.getUserData();
                            if (this.currentUser.role === targetRoute.accessLevel)
                                observer.next(true);
                            else {
                                localStorage.clear();
                                this.router.navigate(['/auth']);
                                observer.next(false);
                            }
                        },
                        (err) => {
                            localStorage.clear();
                            this.router.navigate(['/auth']);
                            observer.next(false);
                        }
                        );
                }
                else {
                    //  not logged in so redirect to login page with the return url
                    // this.router.navigate(['/auth'], { queryParams: { returnUrl: state.url } });
                    localStorage.clear();
                    this.router.navigate(['/auth']);
                    observer.next(false);
                }
            });
    }

}