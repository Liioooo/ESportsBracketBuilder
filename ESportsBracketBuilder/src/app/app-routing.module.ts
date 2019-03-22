import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HOME_ROUTES} from '@home/home.module';
import {AuthGuard} from '@shared/guards/auth/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        children: HOME_ROUTES,
    },
    {
        path: 'all-brackets',
        loadChildren: '@bracketList/bracket-list.module#BracketListModule',
        canActivate: [AuthGuard]
    },
    {
        path: 'bracket',
        loadChildren: '@bracket/bracket.module#BracketModule',
        canActivate: [AuthGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
