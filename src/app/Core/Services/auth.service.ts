import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userInfo: any;

  constructor(private http: HttpClient) {}

  SignUp(userData: User): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signup',
      userData
    );
  }

  Login(userData: User): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/auth/signin',
      userData
    );
  }

  decodedToken(): void {
    if (localStorage.getItem('token') !== null) {
      const encode = localStorage.getItem('token');
      if (encode !== null) {
        const decode = jwtDecode(encode);
        this.userInfo = decode;
        console.log(this.userInfo);

      }
    }
  }

  updatePassword(updateData: object) : Observable<any> {
    return this.http.put(
      'https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', updateData
    );
  }
}
