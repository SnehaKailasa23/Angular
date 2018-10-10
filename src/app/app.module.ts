import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import {ErrorMessageService} from './error.message.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import * as $ from 'jquery';
import * as bootstrap from 'bootstrap';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
//import { PowerBIModule } from 'angular2-powerbi';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    DashboardModule,
    AppRoutingModule,
    HttpClientModule,
    //PowerBIModule
  ],
  providers: [ErrorMessageService, 
  {provide: LocationStrategy, useClass: HashLocationStrategy}
  ],
  bootstrap: [AppComponent]
})

export class AppModule {

  
 }
