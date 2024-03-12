import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  catchError,
  map,
  tap,
  throwError,
} from 'rxjs';
import { User } from './user';
import { UserRequestGUbU } from './requests/userRequestGUbU';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  currentUserRol: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );

  constructor(private http: HttpClient) {}

  getUserByUsername(requestObject: UserRequestGUbU): Observable<any> {
    return this.http
      .post<any>(environment.urlApi + 'user/find-user', requestObject)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
        }),
        map((userData) => userData.userDto),

        catchError(this.handleError)
      );
  }

  getUserRole(requestObject: UserRequestGUbU): Observable<boolean> {
    return this.http
      .post<any>(environment.urlApi + 'user/getRole', requestObject)
      .pipe(
        tap((userData) => {
          if (userData != null) {
            this.currentUserRol.next(userData.rol === 'ROLE_ADMIN');
          }
        }),
        map(() => this.currentUserRol.value),
        catchError(this.handleError)
      );
  }

  updateUser(userRequest: User): Observable<any> {
    let username = sessionStorage.getItem('username');

    if (username) {
      userRequest.username = username;
    }

    return this.http
      .put<any>(environment.urlApi + 'user/update', userRequest)
      .pipe(
        tap((userData) => {
          sessionStorage.setItem('token', userData.token);
        }),

        catchError(this.handleError)
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

  get userData(): Observable<boolean> {
    return this.currentUserRol.asObservable();
  }
}
