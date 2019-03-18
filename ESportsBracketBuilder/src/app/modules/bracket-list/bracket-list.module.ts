import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBracketsComponent } from './components/all-brackets/all-brackets.component';
import {BracketListRoutingModule} from './bracket-list-routing.module';
import {SharedModule} from '@shared/shared.module';
import { NewBracketModalComponent } from './components/new-bracket-modal/new-bracket-modal.component';
import {NgbModalModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AllBracketsComponent, NewBracketModalComponent],
  imports: [
    CommonModule,
    BracketListRoutingModule,
    SharedModule,
    NgbModalModule,
    ReactiveFormsModule,
    FormsModule
  ],
  entryComponents: [
      NewBracketModalComponent
  ]
})
export class BracketListModule { }
