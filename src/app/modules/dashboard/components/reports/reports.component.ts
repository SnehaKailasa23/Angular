import { Component, OnInit, NgZone, ViewChild, ElementRef } from '@angular/core';
import { DatePipe } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {reportsMap, ReportFilters} from '@dashboard/components/reports/reports.mapping';
import { Router, ActivatedRoute,Params, NavigationEnd } from '@angular/router'; 
//import * as pbi-model from 'models';
import { Observable } from 'rxjs/Observable';
import {ReportService} from '@dashboard/services/report.service';
import {SharedService} from '@shared/services/shared.service';

import * as pbi from 'powerbi-client';
@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  reports;
  powerBIAccessToken;
  
  constructor(
  public _sanitizer: DomSanitizer,private _reportService : ReportService, private _activatedRoute: ActivatedRoute,
  private _zone: NgZone, private _router: Router, private _sharedService: SharedService
  ) {
     this._router.routeReuseStrategy.shouldReuseRoute = function() {
        return false;
    };
    }
    PBmodel: pbi.IEmbedConfiguration;
    title: string;
    report: pbi.Report;
    pages: pbi.Page[];
    currentPage: pbi.Page;
    powerbi: pbi.service.Service;
    isActive=false;
    titleDashboard='Power BI';
    powerBIWorkSpace;
    isBurgerMenuOpen=false;
    embeddedUrl;
    showFilterPanel=false;
    showNavigationBar=false;
    embeddedUrlOption;
    reportId;
    reportName;
  ngOnInit() {
    this.getAccessToken();
  }


getAccessToken(){
    this._reportService.getPowerBiAccessToken().subscribe(
      (data) => {
        this.powerBIAccessToken=<any>data['accessToken'];
        this._sharedService.setPowerBIAccessToken(<any>data['accessToken']);
        this._sharedService.setPowerBIWorkSpace(<any>data['workspace']);
        this.powerBIWorkSpace = <any>data['workspace'];
        this.powerBIWorkSpace = null;
        this.getReports();
      },(err) => {


      }
      );
  }

  ngAfterViewInit() {
    $('[data-toggle="tooltip"]').tooltip();
    $('iframe').css('border','none');
  }
  openFilterPane(){
    this.isActive=!this.isActive;
  }
  closeFilterPane(){
    this.isActive=!this.isActive;
  } 
  
  getReports() {
    this.reports = [];
    this._reportService.fetchReports(this.powerBIAccessToken,this.powerBIWorkSpace).subscribe(reports => {
      this.reports = reports['value'];
      //this.currentReport('kpi/slas');// kpi/slas
    }, (err) => {
      if(err.status==403){
        this.getAccessToken();
      }
    });
  }
  showReport(embedUrlOrg,embedReportId,reportName) {
    let report_key ='powerbi_report';
    let loadingContainer: HTMLElement = document.getElementsByClassName('loading').item(0) as HTMLElement;
    
    let embedUrl=embedUrlOrg+"&filterPaneEnabled="+this.showFilterPanel+"&navContentPaneEnabled="+this.showNavigationBar;
    
    
    
    let containerId='container_'+report_key; 
   
    let reportContainer = <HTMLElement>document.getElementById(containerId);
    if(reportContainer!=null){
    loadingContainer.style.display = 'block'; 
    
    let filters=[];
    
    let config= {
        type: 'report',
        accessToken: this.powerBIAccessToken,
        embedUrl: embedUrl,
        id: embedReportId,
        filters: filters,
        settings:{localeSettings: { language: 'English', formatLocale: 'EN' }},
        filterPaneEnabled: false };
      
    
    // Embed the report and display it within the div container.
    let powerbi = new pbi.service.Service(pbi.factories.hpmFactory, pbi.factories.wpmpFactory, pbi.factories.routerFactory);
    powerbi.reset(reportContainer);
    powerbi.preload(config,reportContainer);
    let report = powerbi.embed(reportContainer, config);
  
    report.off("loaded");
    
    
    
    report.on("loaded", function() {
        
        $('iframe').css({'border':'none'});
        let idCont='#'+containerId;
        
        
        
    });
    report.on("rendered",function(){
      
      loadingContainer.style.display='none';
      
    });
    report.on("error", function() {
      this._reportService.getPowerBiAccessToken().subscribe(
      (data) => {
        this.powerBIAccessToken=<any>data['accessToken'];
        this._sharedService.setPowerBIAccessToken(<any>data['accessToken']);
        this.showReport(embedUrlOrg,embedReportId,report_key);
      },(err) => {


      }
      );
    });
  }
}
myFunction() {
    this.isBurgerMenuOpen=!this.isBurgerMenuOpen;
}
onChange(e){
  this.embeddedUrl=this.embeddedUrlOption.embedUrl;
  this.reportId=this.embeddedUrlOption.id;
  this.reportName=this.embeddedUrlOption.name;
}
renderReport(){
  this.showReport(this.embeddedUrl,this.reportId,this.reportName);
}
}

