import { Injectable } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import "rxjs/add/operator/do";

// import { AngularReduxRequestOptions } from './angular-redux-request.options';

import { LoaderService } from './loader.service';

@Injectable()
export class CustotmHttpInterceptor implements HttpInterceptor {


  constructor(
    private loaderService: LoaderService, private router: Router, private route: ActivatedRoute
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loaderService.show();
    const authReq = req.clone({
      headers: req.headers.set('Authorization', localStorage.getItem('access_token') || '')
    });
    return next.handle(authReq)
      .do(
      (response) => {
        if (response instanceof HttpResponse) {
          this.loaderService.hide();
          return response;
        }
      },
      (error) => {
        this.loaderService.hide();
        if (error.error.errorCode == 401) {
          localStorage.clear();
          this.router.navigate(['../auth'], { relativeTo: this.route });
          return;
        }
        return error.error;
      });
  }

  // get(url: string, options?: RequestOptionsArgs): Observable<any> {

  //   this.showLoader();

  //   return super.get(url, this.requestOptions(options))
  //     .catch(this.onCatch)
  //     .do((res: Response) => {
  //       this.onSuccess(res);
  //     }, (error: any) => {
  //       this.onError(error);
  //     })
  //     .finally(() => {
  //       this.onEnd();
  //     });

  // }

  // post(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

  //   this.showLoader();

  //   return super.post(url, body, this.requestOptions(options))
  //     .catch(this.onCatch)
  //     .do((res: Response) => {
  //       this.onSuccess(res);
  //     }, (error: any) => {
  //       this.onError(error);
  //     })
  //     .finally(() => {
  //       this.onEnd();
  //     });

  // }

  // put(url: string, body: any, options?: RequestOptionsArgs): Observable<any> {

  //   this.showLoader();

  //   return super.put(url, body, this.requestOptions(options))
  //     .catch(this.onCatch)
  //     .do((res: Response) => {
  //       this.onSuccess(res);
  //     }, (error: any) => {
  //       this.onError(error);
  //     })
  //     .finally(() => {
  //       this.onEnd();
  //     });

  // }

  // private requestOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

  //   if (options == null) {
  //     options = new BaseRequestOptions();
  //   }

  //   if (options.headers == null) {
  //     options.headers = new Headers();
  //   }

  //   return options;
  // }

  // // private getFullUrl(url: string): string {
  // //   return this.apiUrl + url;
  // // }

  // private onCatch(error: any, caught: Observable<any>): Observable<any> {
  //   return Observable.throw(error);
  // }

  // private onSuccess(res: Response): void {
  //   console.log('Request successful');
  // }

  // private onError(res: Response): void {
  //   console.log('Error, status code: ' + res.status);
  // }

  // private onEnd(): void {
  //   this.hideLoader();
  // }

  // private showLoader(): void {
  //   this.loaderService.show();
  // }

  // private hideLoader(): void {
  //   this.loaderService.hide();
  // }
}