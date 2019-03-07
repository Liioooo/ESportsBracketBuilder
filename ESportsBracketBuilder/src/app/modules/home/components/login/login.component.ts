import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    @Output()
    loginRegisterStateChanged = new EventEmitter<'login' | 'register'>();

    constructor() { }

    ngOnInit() {
    }

    changeLoginRegisterPage() {
        this.loginRegisterStateChanged.emit('register');
    }

}
