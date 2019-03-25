import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BracketComponent } from './components/bracket/bracket.component';
import {BracketRoutingModule} from '@bracket/bracket-routing.module';
import { GameComponent } from './components/game/game.component';

@NgModule({
  declarations: [BracketComponent, GameComponent],
  imports: [
    CommonModule,
    BracketRoutingModule
  ]
})
export class BracketModule { }
