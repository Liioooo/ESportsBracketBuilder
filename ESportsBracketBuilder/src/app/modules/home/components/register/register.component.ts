import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PasswordMatch} from '@home/validators/PasswordMatch';
import {AuthService} from '@shared/services/auth/auth.service';
import {EmailAvailable} from '@home/validators/EmailAvailable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    @Output()
    loginRegisterStateChanged = new EventEmitter<'login' | 'register'>();

    public registerForm: FormGroup;
    public hasSubmitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService,
        private emailAvailable: EmailAvailable
    ) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
            'email': ['', [Validators.required, Validators.email], [this.emailAvailable]],
            'password': ['', [Validators.required, Validators.minLength(8)]],
            'passwordRepeat': ['', [Validators.required]]
        }, {
            validators: [PasswordMatch.matches]
        });
    }

    registerClick() {
        this.hasSubmitted = true;
        if (this.registerForm.invalid) {
            return;
        }

        const email = this.registerForm.controls.email.value;
        const password = this.registerForm.controls.password.value;

        this.authService.register(email, password).subscribe(resp => this.registerForm.controls.email.setErrors({isNotAvailable: true}));
    }

    changeLoginRegisterPage() {
        this.loginRegisterStateChanged.emit('login');
    }

}
