import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, tap, throwError } from 'rxjs';
import { User } from '../auth/user';
import { UserRequestGUbU } from './requests/userRequestGUbU';
import { environment } from '../../../environments/environment';
import { LoginService } from '../auth/login.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<User> {
    return this.http
      .get<User>(environment.urlApi + 'user/' + id)
      .pipe(catchError(this.handleError));
  }

  getUserByUsername(requestObject: UserRequestGUbU): Observable<User> {
    return this.http
      .post<User>(environment.urlApi + 'user/find-user', requestObject)
      .pipe(catchError(this.handleError));
  }
  updateUser(userRequest: User): Observable<any> {
    let username = sessionStorage.getItem('username');

    if (username) {
      userRequest.username = username;
    }

    return this.http.put<any>(environment.urlApi + 'user/update', userRequest).pipe(
      tap((userData) => {
        console.log(userData);
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
}
