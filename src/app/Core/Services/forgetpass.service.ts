import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ForgetpassService {
  constructor(private _HttpClient: HttpClient) {}

  baseUl: string = 'https://ecommerce.routemisr.com/api/v1/auth/';

  forgetPassword(userEmail: object): Observable<any> {
    return this._HttpClient.post(this.baseUl + 'forgotPasswords', userEmail);
  }

  verifyResetCode(resetCode: object): Observable<any> {
    return this._HttpClient.post(this.baseUl + 'verifyResetCode', resetCode);
  }

  resetPassword(resetPasswordForm: object): Observable<any> {
    return this._HttpClient.put(this.baseUl + 'resetPassword', resetPasswordForm);
  }
}
