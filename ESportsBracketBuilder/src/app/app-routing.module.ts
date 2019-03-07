import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from '@home/home.module';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        children: HOME_ROUTES
    },
    {
        path: 'all-brackets',
        loadChildren: '@bracketList/bracket-list.module#BracketListModule'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
