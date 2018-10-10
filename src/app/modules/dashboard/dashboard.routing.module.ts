import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard.component';
import {reportRoutes} from './components/reports/reports.routes';
const dashboardRoutes: Routes = [
   {path: '', component: DashboardComponent, children: [
      
       {path: 'reports', children: reportRoutes}


   ]}
];

export const DashboardRoutingModule = RouterModule.forChild(dashboardRoutes);