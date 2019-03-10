import {FormControl} from '@angular/forms';

export class PasswordMatch {

    public static matches(c: FormControl) {
        const p1 = c.get('password').value;
        const p2 = c.get('passwordRepeat').value;
        if (p1 !== p2) {
            c.get('passwordRepeat').setErrors({matchPassword: true});
        } else {
            return null;
        }
    }

}