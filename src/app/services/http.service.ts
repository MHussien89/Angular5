import { Injectable } from '@angular/core';
import { BaseRequestOptions } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Header } from '../models/http-header';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import {
  RequestOptions,
  RequestOptionsArgs,
  Response,
  Request,
  Headers,
  XHRBackend
} from '@angular/http';

// import { AngularReduxRequestOptions } from './angular-redux-request.options';

import { LoaderService } from './loader.service';

@Injectable()
export class HttpService {


  constructor(private http: HttpClient) { }

  get<T>(url: string, headers?: Header[]): Observable<any> {

    // this.showLoader();

    return this.http.get(url, this.requestOptions(headers))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      });
    // .finally(() => {
    //   this.onEnd();
    // });

  }

  post(url: string, body: any, headers?: Header[]): Observable<any> {

    // this.showLoader();

    return this.http.post(url, body, this.requestOptions(headers))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      });
    // .finally(() => {
    //   this.onEnd();
    // });

  }

  put(url: string, body: any, headers?: Header[]): Observable<any> {

    // this.showLoader();

    return this.http.put(url, body, this.requestOptions(headers))
      .catch(this.onCatch)
      .do((res: Response) => {
        this.onSuccess(res);
      });
    // .finally(() => {
    //   this.onEnd();
    // });

  }

  delete(url: string, body: any, headers?: Header[]): Observable<any> {

    return this.http.request('DELETE', url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body
    });

  }

  private requestOptions(headers?: Header[]) {
    // let options = new HttpHeaders({ headers: headers });
    if (headers == null) {
      return { 'headers': new HttpHeaders() };
    }
    let httpHeaders = new HttpHeaders();
    headers.forEach(header => {
      httpHeaders = httpHeaders.append(header.key, header.value);
    });
    return { 'headers': httpHeaders };
  }

  // private getFullUrl(url: string): string {
  //   return this.apiUrl + url;
  // }

  private onCatch(error: any, caught: Observable<any>): Observable<any> {
    return Observable.throw(error.error.response || 'Server Error');
  }

  private onSuccess(res: Response): void {
    console.log('Request successful');
  }

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