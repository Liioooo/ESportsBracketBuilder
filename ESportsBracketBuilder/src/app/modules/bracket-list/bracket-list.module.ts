import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBracketsComponent } from './components/all-brackets/all-brackets.component';
import {BracketListRoutingModule} from './bracket-list-routing.module';
import {SharedModule} from '@shared/shared.module';
import { NewBracketModalComponent } from './components/new-bracket-modal/new-bracket-modal.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { SingleBracketComponent } from './components/single-bracket/single-bracket.component';
import { ConfirmDeleteModalComponent } from './components/confirm-delete-modal/confirm-delete-modal.component';

@NgModule({
  declarations: [AllBracketsComponent, NewBracketModalComponent, SingleBracketComponent, ConfirmDeleteModalComponent],
  imports: [
    CommonModule,
    BracketListRoutingModule,
    SharedModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
      NewBracketModalComponent,
      ConfirmDeleteModalComponent
  ]
})
export class BracketListModule { }
