import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@shared/services/auth/auth.service';

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
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
           'email': ['', [Validators.required, Validators.email], [c => this.authService.doesUserExistValidator(c)]],
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
