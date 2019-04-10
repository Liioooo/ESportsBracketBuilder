import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {filter, map} from 'rxjs/operators';
import {FormControl, ValidationErrors} from '@angular/forms';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private userId: number;

  constructor(
      private http: HttpClient,
      private router: Router
  ) { }

  public isEmailAvailable(email: string): Observable<boolean> {
      return this.http.post('/api/', {
          apiAction: 'doesUserExist',
          params: {
            email
          }
      }).pipe(
          map(resp => resp['response']['available'])
      );
  }

  public login(email: string, password: string): Observable<any> {
      return this.http.post('/api/', {
          apiAction: 'login',
          params: {
              email,
              password
          }
      }).pipe(
          map(resp => resp['response']),
          filter(resp => {
              if (resp.token) {
                  this.setToken(resp.token);
                  this.router.navigate(['/all-brackets']);
                  return false;
              }
              return true;
          })
      );
  }

  public register(email: string, password: string): Observable<any> {
      return this.http.post('/api/', {
          apiAction: 'register',
          params: {
              email,
              password
          }
      }).pipe(
          map(resp => resp['response']),
          filter(resp => {
              if (resp.token) {
                  this.setToken(resp.token);
                  this.router.navigate(['/all-brackets']);
                  return false;
              }
              return true;
          })
      );
  }

  public logout() {
      sessionStorage.removeItem('token');
      this.router.navigate(['/home']);
  }

  private setToken(token: string) {
      sessionStorage.setItem('token', token);
      this.token = token;
      this.userId = this.decodeJWT(this.getToken())['sub'];
  }

  public getToken(): string {
      if (!this.token) {
          this.token = sessionStorage.getItem('token');
      }
      return this.token;
  }

  public getUserId(): number {
      if (!this.userId) {
          this.userId = this.decodeJWT(this.getToken())['sub'];
      }
      return this.userId;
  }

  private decodeJWT(token: string): object {
      if (token === null) {
          return null;
      }
      const jwtData = token.split('.')[1];
      const decodedJwtJsonData = window.atob(jwtData);
      return JSON.parse(decodedJwtJsonData);
  }

  public isLoggedIn(): boolean {
      return this.getToken() !== null;
  }
}
