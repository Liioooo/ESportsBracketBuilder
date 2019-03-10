import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {FormControl, ValidationErrors} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private isEmailAvailable(email: string): Observable<boolean> {
      return this.http.post('/api/', {
          apiAction: 'doesUserExist',
          params: {
            email
          }
      }).pipe(
          map(resp => resp['response']['available'])
      );
  }

  public isEmailAvailableValidator(c: FormControl): Observable<ValidationErrors | null> {
      return this.isEmailAvailable(c.value).pipe(
          map(isAvail => {
              if (isAvail) {
                  return null;
              } else {
                  return {isNotAvailable: true};
              }
          })
      );
  }

  public login(email: string, password: string) {

  }

  public register(email: string, password: string) {

  }
}
