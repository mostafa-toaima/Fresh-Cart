import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  baseUrl: string = 'https://ecommerce.routemisr.com';

  constructor(private http: HttpClient) {}


  GetAllProducts(pageNum:number = 1): Observable<any> {
    return this.http.get(this.baseUrl + `/api/v1/products?page=${pageNum}`);
  }

  GetSpecificProduct(id:any): Observable<any> {
    return this.http.get(this.baseUrl + `/api/v1/products/${id}`);
  }

  GetCategories(): Observable<any> {
    return this.http.get(this.baseUrl + '/api/v1/categories');
  }

  GetCategoryDetails(catId: string | null): Observable<any> {
    return this.http.get(this.baseUrl + `/api/v1/categories/${catId}`);
  }

}
