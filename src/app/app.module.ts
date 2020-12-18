import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { ErrorInterceptor } from './interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { AuthModule } from './auth/auth.module';
import { MembersModule } from './members/members.module';
import { MessageModule } from './messages/message.module';



@NgModule({
   declarations: [
      AppComponent,
      NotFoundComponent,
      ServerErrorComponent,
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      SharedModule,
      MembersModule,
      AuthModule,
      MessageModule
   ],
   providers: [
      {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true},
      {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
