// category.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, map, tap, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Category } from './category';
import { TokenMessageResponse } from '../responses/tokenMessageResponse';
import { TokenIdRequestId } from '../requests/tokenIdRequestId';
import { CategoryRequest } from './requests/categoryRequest';
import { CategoryRequestId } from './requests/categoryRequestId';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(environment.urlApi + 'categories');
  }

  getCategoryById(categoryId: number): Observable<Category> {
    return this.http
      .post<Category>(environment.urlApi + `categories/${categoryId}`, null)
      .pipe(map((response) => response));
  }

  createCategory(
    categoryRequest: CategoryRequest
  ): Observable<TokenMessageResponse> {
    return this.http
      .post<TokenMessageResponse>(
        environment.urlApi + 'categories',
        categoryRequest
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem('token', response.token);
        }),
        map((response) => response)
      );
  }

  updateCategory(
    categoryRequestId: CategoryRequestId
  ): Observable<TokenMessageResponse> {
    return this.http
      .put<TokenMessageResponse>(
        environment.urlApi + 'categories',
        categoryRequestId
      )
      .pipe(
        tap((response) => {
          sessionStorage.setItem('token', response.token);
        }),
        map((response) => response)
      );
  }

  deleteCategory(
    tokenIdRequestId: TokenIdRequestId
  ): Observable<TokenMessageResponse> {
    return this.http.post<TokenMessageResponse>(
      environment.urlApi + 'categories/delete',
      tokenIdRequestId
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('Se ha producido un error ', error.error);
    } else {
      console.error(
        'Backend retornó el código de estado ',
        error.status,
        error.error
      );
    }
    return throwError(
      () => new Error('Algo falló. Por favor, inténtelo nuevamente.')
    );
  }
}
