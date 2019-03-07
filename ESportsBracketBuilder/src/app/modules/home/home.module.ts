import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeComponent } from './components/home/home.component';
import {SharedModule} from '@shared/shared.module';
import {Routes} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';

export const HOME_ROUTES: Routes = [
    {path: '', component: HomeComponent}
];

@NgModule({
  declarations: [HomeComponent, LoginComponent, RegisterComponent],
  imports: [
      CommonModule,
      SharedModule
  ]
})
export class HomeModule { }
