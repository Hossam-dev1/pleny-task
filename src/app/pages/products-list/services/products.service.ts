import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { env } from 'src/enviroments/env';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  endPoint: string = 'products'
  constructor(private _http: HttpClient) { }

  getCategories(): Observable<any> {
    return this._http.get(env.baseUrl + this.endPoint + '/categories');
  }

  getProducts(params: any): Observable<any> {
    return this._http.get(env.baseUrl + this.endPoint, { params });
  }

  getProductByCategory(category: string, params: any): Observable<any> {
    return this._http.get(env.baseUrl + this.endPoint + '/category/' + category, {
      params
    });
  }

  getCartByUserID(ID: number): Observable<any> {
    return this._http.get(env.baseUrl + 'carts/user/' + ID);
  }

  addToCart(data: any): Observable<any> {
    return this._http.post(env.baseUrl + 'carts/add', data);
  }
}
