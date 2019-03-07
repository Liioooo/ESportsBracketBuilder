import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBracketsComponent } from './components/all-brackets/all-brackets.component';
import {BracketListRoutingModule} from './bracket-list-routing.module';

@NgModule({
  declarations: [AllBracketsComponent],
  imports: [
    CommonModule,
    BracketListRoutingModule
  ]
})
export class BracketListModule { }
