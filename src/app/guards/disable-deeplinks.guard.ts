import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, GuardsCheckStart, NavigationEnd, NavigationStart } from '@angular/router';
import { config } from '../config/pages-config';
import { Route } from '../models/route';

import { RouteService } from '../services/route.service';

@Injectable()
export class DisableDeepLinksGuard implements CanActivate {

    constructor(private router: Router, private routeService: RouteService) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                const currentRoute: Route = this.routeService.getRoute(event.url.split('#')[0].split('?')[0]);
                if (currentRoute && currentRoute.disableRefresh && !sessionStorage.getItem('order_url')) {
                    window.addEventListener('beforeunload', this.showNotification);
                }
                else {
                    window.removeEventListener('beforeunload', this.showNotification);
                }
            }
            // if (event instanceof GuardsCheckStart) {
            //     if (sessionStorage.getItem('order_url')) {
            //         window.removeEventListener('beforeunload', this.showNotification);
            //     }
            // }
        });

    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const cleanUrl = window.location.href.split('#')[0].split('?')[0];

        if (window.location.href.indexOf(state.url.split('#')[0].split('?')[0]) >= 0) {
            const currentRoute: Route = this.routeService.getRoute(state.url.split('#')[0].split('?')[0]);
            if (!currentRoute.disableRefresh) {
                return true;
            } else {
                this.router.navigateByUrl(currentRoute.fallBackURL);
                return false;
            }
        } else {
            return true;
        }
    }

    public showNotification(event) {
        const dialogText = 'Your data will be lost!';
        event.returnValue = dialogText;

        return dialogText;
    }


}
