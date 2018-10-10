import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as DM from './dashboardImports';
import { HttpInterceptorService } from '@dashboard/services/interceptors/http-interceptor.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
//import { PowerBIModule } from 'angular2-powerbi';

@NgModule({
  imports: [
    CommonModule,
    DM.DashboardRoutingModule,
    DM.SharedModule,
    DM.ReactiveFormsModule,
    DM.FormsModule,
    
    //PowerBIModule,
    
  ],
  declarations: [
    DM.DashboardComponent, 
    DM.DashboardContentComponent, 
    
    DM.ReportsComponent,
    
    ],
  providers: [
    
       DM.ReportService,
       
       
       {
    provide: HTTP_INTERCEPTORS,
    useClass: HttpInterceptorService,
    multi: true,
  }]
})
export class DashboardModule { }
