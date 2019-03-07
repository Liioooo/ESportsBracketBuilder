import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AllBracketsComponent} from './components/all-brackets/all-brackets.component';

const routes: Routes = [
  {path: '', component: AllBracketsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BracketListRoutingModule { }
