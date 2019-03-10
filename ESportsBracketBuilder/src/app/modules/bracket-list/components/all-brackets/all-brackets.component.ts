import { Component, OnInit } from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';

@Component({
  selector: 'app-all-brackets',
  templateUrl: './all-brackets.component.html',
  styleUrls: ['./all-brackets.component.scss']
})
export class AllBracketsComponent implements OnInit {

  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

}
