import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';
  whishItemNumber: BehaviorSubject<number> = new BehaviorSubject(0);

  constructor(private _HttpClient: HttpClient) {}

  addItemToWishList(prodId: string): Observable<any> {
    return this._HttpClient.post(this.baseUrl + `wishlist`, {
      productId: prodId,
    });
  }

  removeItemFromWishList(prodId: string): Observable<any> {
    return this._HttpClient.delete(this.baseUrl + `wishlist/${prodId}`);
  }

  getLoggedUserWishlist(): Observable<any> {
    return this._HttpClient.get(this.baseUrl + `wishlist`);
  }
}
