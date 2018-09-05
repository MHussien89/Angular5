import { Injectable } from '@angular/core';
import { config } from '../config/pages-config';
import { Route } from '../models/route';


@Injectable()
export class RouteService {

    constructor() { }

    /**
* Find the route object that match with path name given in parameters
* @param pathName - component path name
*/
    public getRoute(url: string): Route {
        let route: Route = null;
        // const config = this.coreconfigigurationsLoaderService.loadPagesRoutes();
        Object.keys(config).forEach(moduleKey => {
            if (config[moduleKey].route === url) {
                route = config[moduleKey];
                return route;
            } else {
                Object.keys(config[moduleKey]).forEach(stepKey => {
                    if (config[moduleKey][stepKey].route === url) {
                        route = config[moduleKey][stepKey];
                        return route;
                    }
                });
            }
        });

        return route;
    }


}