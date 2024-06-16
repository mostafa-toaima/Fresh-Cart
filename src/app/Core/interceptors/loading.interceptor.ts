import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, finalize } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';

@Injectable()
export class loadingInterceptor implements HttpInterceptor {
  constructor(private _NgxSpinnerService: NgxSpinnerService) {}
  counter = 0;

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.counter++;

    this._NgxSpinnerService.show();

    return next.handle(request).pipe(
      finalize(() => {
        this.counter--;
        if (this.counter == 0) this._NgxSpinnerService.hide();
      })
    );
  }
}
