import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Product } from './product';
import { ProductRequest } from './requests/productRequest';
import { TokenMessageResponse } from '../responses/tokenMessageResponse';
import { TokenIdRequestId } from '../requests/tokenIdRequestId';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(environment.urlApi + 'products');
  }

  getProductById(productId: number): Observable<Product> {
    return this.http
      .post<Product>(environment.urlApi + `products/${productId}`, null)
      .pipe(map((response) => response));
  }

  createProduct(
    productRequest: ProductRequest
  ): Observable<TokenMessageResponse> {
    return this.http
      .post<TokenMessageResponse>(
        environment.urlApi + 'products/create',
        productRequest
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem('token', response.token);
        }),
        map((response) => response)
      );
  }

  updateProduct(
    productId: number,
    productRequest: ProductRequest
  ): Observable<TokenMessageResponse> {
    return this.http.put<TokenMessageResponse>(
      environment.urlApi + `products/${productId}`,
      productRequest
    );
  }

  deleteProduct(
    tokenIdRequestId: TokenIdRequestId
  ): Observable<TokenMessageResponse> {
    return this.http.delete<TokenMessageResponse>(
      environment.urlApi + 'products',
      { body: tokenIdRequestId }
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producio un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor intente nuevamente.')
    );
  }
}
