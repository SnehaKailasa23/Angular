import { Injectable, Injector } from '@angular/core';
import {HttpEvent, HttpErrorResponse, HttpResponse, HttpInterceptor, HttpHandler, HttpRequest} from '@angular/common/http';
import {environment} from '@environments/environment';
import { Router } from '@angular/router';
import 'rxjs/add/operator/do';
import { SharedService } from '@shared/services/shared.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/concatMap';
import 'rxjs/add/operator/catch';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor{

  private _sharedService : SharedService;

  constructor(private _router: Router, inj: Injector) { 
    setTimeout(() => {
      this._sharedService = inj.get(SharedService);
    });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //console.log(1);
    let loadingContainer: HTMLElement = document.getElementsByClassName('loading').item(0) as HTMLElement;
    loadingContainer.style.display = 'block';
    return next.handle(req).do((ev: HttpEvent<any>) => {
        if (ev instanceof HttpResponse) {
          loadingContainer.style.display = 'none';
        }
      }).catch((err, source) => {
        loadingContainer.style.display = 'none';
        //console.log(req.url,' || ',environment.EndPoint,' || ',req.url.indexOf(environment.EndPoint));
        //&& req.url.indexOf(environment.EndPoint)>=0
      if (err.status && err instanceof HttpErrorResponse && err.status === 401) {
        
      } else {
        if (err.status && err instanceof HttpErrorResponse && err.status === 400) {
            throw err;
        }
        if (err.status && err instanceof HttpErrorResponse && err.status === 403) {
            return next.handle(req);
        }
        else{

        }
        
        
      }
    });
    // return next.handle(req).catch((err, source) => {
    //   if (err instanceof HttpErrorResponse && err.status === 401) {
    //     return this._sharedService.refreshToken().concatMap(() => next.handle(
    //       req.clone({headers: req.headers.set('Authorization',  this._sharedService.getAccessToken())})
    //     ));
    //   } else {
    //     throw err;
    //   }
    // });
  }
}
