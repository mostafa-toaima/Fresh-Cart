import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  cartNumber: BehaviorSubject<number> = new BehaviorSubject(0);



  constructor(private http: HttpClient) {}

  addToCart(prodId: string): Observable<any> {
    return this.http.post(
      'https://ecommerce.routemisr.com/api/v1/cart',
      {
        productId: prodId,
      }
    );
  }

  getUserCart(): Observable<any> {
    return this.http.get('https://ecommerce.routemisr.com/api/v1/cart');
  }

  updateProductCount(prodId: string, countNum: number): Observable<any> {
    return this.http.put(
      this.baseUrl + `cart/${prodId}`,
      {
        count: countNum,
      }
    );
  }

  removeSpecificItem(prodId: string): Observable<any> {
    return this.http.delete(this.baseUrl + `cart/${prodId}`);
  }

  deleteCrt(): Observable<any> {
    return this.http.delete(this.baseUrl + 'cart');
  }

  checkOut(cartId: string|null, orderInfo:  object): Observable<any> {
    return this.http.post(
      this.baseUrl +
        `orders/checkout-session/${cartId}?url=http://localhost:4200`,
      {
        shippingAddress: orderInfo
      }
    );
  }
}
