import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {SharedModule} from '@shared/shared.module';
import {HomeModule} from '@home/home.module';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {TokenInterceptor} from '@shared/interceptors/token/token.interceptor';
import {ErrorHandlerInterceptor} from '@shared/interceptors/error-handler/error-handler.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,
      SharedModule.forRoot(),
      AppRoutingModule,
      HomeModule,
  ],
  providers: [
      {
          provide: HTTP_INTERCEPTORS,
          useClass: TokenInterceptor,
          multi: true
      },
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerInterceptor,
          multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
