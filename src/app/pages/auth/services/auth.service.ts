import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Login, LoginResponse } from 'src/app/cores/interface/auth.interface';
import { env } from 'src/enviroments/env';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  endPoint: string = 'auth/';
  isAuthenticated$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.getAuthToken());

  constructor(private _http: HttpClient) { }


  login(credentials: Login): Observable<LoginResponse> {
    return this._http.post<LoginResponse>(`${env.baseUrl}${this.endPoint}login`, credentials);
  }

  setAuthData(data: LoginResponse) {
    this.isAuthenticated$.next(true);
    localStorage.setItem(env.title + 'userID', data.id.toString());
    localStorage.setItem(env.title + 'authToken', data.token);
  }

  getAuthToken(): boolean {
    return !!localStorage.getItem(env.title + 'authToken');
  }
}
