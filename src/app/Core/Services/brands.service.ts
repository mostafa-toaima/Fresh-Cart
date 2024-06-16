import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private _HttpClient: HttpClient) { }

  baseUrl: string = 'https://ecommerce.routemisr.com/api/v1/';

  getAllBrands(pageNum:number =1) {
    return this._HttpClient.get(this.baseUrl + `brands?page=${pageNum}`);
  }
}
