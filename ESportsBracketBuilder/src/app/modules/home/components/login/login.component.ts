import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
           'email': ['', [Validators.required, Validators.email]],
           'password': ['', [Validators.required, Validators.minLength(8)]]
        });
    }

    loginClick() {
        this.hasSubmitted = true;
        if (this.loginForm.invalid) {
            return;
        }
    }

    changeLoginRegisterPage() {
        this.loginRegisterStateChanged.emit('register');
    }

}
