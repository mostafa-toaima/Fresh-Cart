import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class myhttpInterceptor implements HttpInterceptor {
  constructor() {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem('token') != null) {
      const myToken: any = {
        token: localStorage.getItem('token'),
      };

      req = req.clone({
        setHeaders: myToken,
      });
    }
    return next.handle(req);
  }
}
