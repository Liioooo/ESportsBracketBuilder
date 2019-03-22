import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketComponent } from './components/bracket/bracket.component';
import {BracketRoutingModule} from '@bracket/bracket-routing.module';

@NgModule({
  declarations: [BracketComponent],
  imports: [
    CommonModule,
    BracketRoutingModule
  ]
})
export class BracketModule { }
