import { Injectable } from '@angular/core';
import {HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse, HttpErrorResponse} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from '@shared/services/auth/auth.service';
import {tap} from 'rxjs/operators';

@Injectable()
export class ErrorHandlerInterceptor implements HttpInterceptor {

    constructor(public auth: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(event => {}, (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === 403) {
                        this.auth.logout();
                    }
                }
            })
        );
    }
}
