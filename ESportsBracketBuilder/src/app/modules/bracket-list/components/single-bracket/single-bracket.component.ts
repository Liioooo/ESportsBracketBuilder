import {Component, Input, OnInit} from '@angular/core';
import {BracketsService} from '@shared/services/brackets/brackets.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {ConfirmDeleteModalComponent} from '@bracketList/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-single-bracket',
  templateUrl: './single-bracket.component.html',
  styleUrls: ['./single-bracket.component.scss']
})
export class SingleBracketComponent implements OnInit {

  public editing = false;

  @Input()
  bracket: {id: number, name: string};

  constructor(private bracketsService: BracketsService, private modalService: NgbModal) { }

  ngOnInit() {
  }

  editOrSaveName() {
    if (this.editing) {
      this.bracketsService.updateBracketName(this.bracket.id, this.bracket.name).subscribe(_ => this.editing = false);
    } else {
        this.editing = true;
    }
  }

  async deleteBracket() {
      const modalRef = this.modalService.open(ConfirmDeleteModalComponent);
      modalRef.componentInstance.bracketName = this.bracket.name;
      try {
          const result = await modalRef.result;
          if (result === 'delete') {
              this.bracketsService.deleteBracket(this.bracket.id).subscribe(_ => this.bracketsService.updateBracketList());
          }
      } catch (e) {}
  }

}
