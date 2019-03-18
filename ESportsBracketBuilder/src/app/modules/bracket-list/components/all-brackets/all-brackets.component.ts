import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AuthService} from '@shared/services/auth/auth.service';
import {NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {NewBracketModalComponent} from '@bracketList/components/new-bracket-modal/new-bracket-modal.component';
import {BracketsService} from '@shared/services/brackets/brackets.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-all-brackets',
  templateUrl: './all-brackets.component.html',
  styleUrls: ['./all-brackets.component.scss']
})
export class AllBracketsComponent implements OnInit, AfterViewInit {

  public allBrackets$: Observable<{id: number, name: string}[]>;

  constructor(private authService: AuthService, private modalService: NgbModal, private bracketService: BracketsService) { }

  ngOnInit() {
    this.allBrackets$ = this.bracketService.allBrackets();
  }

  ngAfterViewInit(): void {
    this.bracketService.updateBracketList();
  }


  logoutClick() {
    this.authService.logout();
  }

  async newBracketClick() {
    const result = await this.modalService.open(NewBracketModalComponent, { size: 'lg' }).result;
    if (result === 'added') {
      this.bracketService.updateBracketList();
    }
  }

}
