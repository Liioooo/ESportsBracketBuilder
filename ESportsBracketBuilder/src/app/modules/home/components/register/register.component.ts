import {Component, EventEmitter, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    @Output()
    loginRegisterStateChanged = new EventEmitter<'login' | 'register'>();

    constructor() { }

    ngOnInit() {
    }

    changeLoginRegisterPage() {
        this.loginRegisterStateChanged.emit('login');
    }

}
