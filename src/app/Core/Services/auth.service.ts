import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) { }


  SignUp(userData:User):Observable<any> {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signup', userData);
  }

  Login(userData:User):Observable<any> {
    return this.http.post('https://ecommerce.routemisr.com/api/v1/auth/signin', userData);
  }


  
}
