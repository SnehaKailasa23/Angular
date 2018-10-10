import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import {SharedService} from '@shared/services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  username: string;
 
  constructor(
    private _router: Router,
    private _sharedService: SharedService
  ) { }

  ngOnInit() {
      
    
          
  }
  ngAfterViewInit() {
    // Hide modal when user press back button
    $(window).on('popstate', function (event) {
      if((<any>event).state !== null) {
        $('.modal').modal('hide');
      }
    });
  }
}
