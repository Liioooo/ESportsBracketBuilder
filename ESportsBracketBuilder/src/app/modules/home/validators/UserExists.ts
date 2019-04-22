import {AbstractControl, AsyncValidator, ValidationErrors} from '@angular/forms';
import {Observable} from 'rxjs';
import {AuthService} from '@shared/services/auth/auth.service';
import {map} from 'rxjs/operators';
import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserExists implements AsyncValidator {

    constructor(private authService: AuthService) {}

    public validate(control: AbstractControl): Observable<ValidationErrors | null> {
        return this.authService.isEmailAvailable(control.value).pipe(
            map(isAvail => {
                if (isAvail) {
                    return {doesNotExist: true};
                } else {
                    return null;
                }
            })
        );
    }

}
