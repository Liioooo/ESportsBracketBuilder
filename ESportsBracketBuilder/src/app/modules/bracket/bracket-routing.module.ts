import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {BracketComponent} from './components/bracket/bracket.component';

const routes: Routes = [
  {path: ':id', component: BracketComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BracketRoutingModule { }
