import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  myToken: any = {
    token: localStorage.getItem('token'),
  };
  constructor(private http: HttpClient) {}

  addToCart(prodId: string): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: prodId,
      },
      {
        headers: this.myToken,
      }
    );
  }
  getUserCart(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/cart', {
      headers: this.myToken,
    });
  }
}