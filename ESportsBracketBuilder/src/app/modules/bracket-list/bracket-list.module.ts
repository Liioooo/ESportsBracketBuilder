import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBracketsComponent } from './components/all-brackets/all-brackets.component';
import {BracketListRoutingModule} from './bracket-list-routing.module';
import {SharedModule} from '@shared/shared.module';

@NgModule({
  declarations: [AllBracketsComponent],
  imports: [
    CommonModule,
    BracketListRoutingModule,
    SharedModule
  ]
})
export class BracketListModule { }
