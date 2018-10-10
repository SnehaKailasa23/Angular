import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import {environment} from '@environments/environment';
import {api} from '@endpoint/api';
import {SharedService} from '@shared/services/shared.service';

@Injectable()
export class ReportService {

  token;
  headers: HttpHeaders;

  constructor(private _http: HttpClient, private _sharedService: SharedService) { 
  }

  getPowerBiAccessToken(){
    
    return this._http.get(environment.EndPoint +"/api/token-powerbi");
  }
  getHeadersPowerBi(token) {
      return new HttpHeaders().set('Authorization', 'Bearer '+token);
   }
   
   fetchReports(token,workspace) {
     if(workspace===null){
      return this.getApiCall(`https://api.powerbi.com/beta/myorg/reports`, token);
     }
     else{
       return this.getApiCall(`https://api.powerbi.com/beta/myorg/groups/${workspace}/reports`, token);
     }
  }
   getApiCall(endpoint, token) {
    const headers=this.getHeadersPowerBi(token);
    return this._http.get(endpoint,{headers});

  }
  fetchWorkspaces(token) {
    return this.getApiCall(`https://api.powerbi.com/beta/myorg/groups`, token);
  }
}
