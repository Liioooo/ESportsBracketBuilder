import { Component, OnInit } from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewBracketModalComponent} from '@bracketList/components/new-bracket-modal/new-bracket-modal.component';

@Component({
  selector: 'app-all-brackets',
  templateUrl: './all-brackets.component.html',
  styleUrls: ['./all-brackets.component.scss']
})
export class AllBracketsComponent implements OnInit {

  constructor(private authService: AuthService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  logoutClick() {
    this.authService.logout();
  }

  newBracketClick() {
    const modalRef = this.modalService.open(NewBracketModalComponent, { size: 'lg' });
  }

}
