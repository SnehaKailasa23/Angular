import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from '@environments/environment';
import {api} from '@endpoint/api';
import * as CryptoJS from 'crypto-js';
import {roles} from '@dashboard/roles.mapping';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class SharedService {
  datatable;
  fileItem;
  currentrow;
  entityTypes;
  userDetails;
  emitChangeSource = new Subject<any>();
  emitUserNameSource = new Subject<any>();
  emitIsPaid = new Subject<any>();
  constructor(private _http: HttpClient, private _router: Router) { }
  
  setPowerBIAccessToken(token) {
    localStorage.setItem('powerbi_accessToken', token);
  }

  getPowerBIAccessToken() {
    const userID = localStorage.getItem('powerbi_accessToken');
    if (userID) {
      return userID;
    } else {
       //this._router.navigate(['/login']);
    }
  }
  setPowerBIWorkSpace(WorkSpaceID) {
    localStorage.setItem('powerbi_workspace', WorkSpaceID);
  }

  getPowerBIWorkSpace() {
    const WorkSpaceID = localStorage.getItem('powerbi_workspace');
    if (WorkSpaceID) {
      return WorkSpaceID;
    } else {
        return null;
       //this._router.navigate(['/login']);
    }
  }
}
