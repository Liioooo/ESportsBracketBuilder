import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@shared/services/auth/auth.service';
import {UserExists} from '@home/validators/UserExists';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Output()
    loginRegisterStateChanged = new EventEmitter<'login' | 'register'>();

    public loginForm: FormGroup;
    public hasSubmitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private userExists: UserExists
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
           'email': ['', [Validators.required, Validators.email], [this.userExists]],
           'password': ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    loginClick() {
        this.hasSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }

        const email = this.loginForm.controls.email.value;
        const password = this.loginForm.controls.password.value;

        this.authService.login(email, password).subscribe(resp => {
            if (resp.loginError === 'doesNotExist') {
                this.loginForm.controls.email.setErrors({doesNotExist: true});
            } else if (resp.loginError === 'invalidPW') {
                this.loginForm.controls.password.setErrors({invalidPW: true});
            }
        });
    }

    changeLoginRegisterPage() {
        this.loginRegisterStateChanged.emit('register');
    }

}
