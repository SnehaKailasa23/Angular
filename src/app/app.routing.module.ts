import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardModule} from '@dashboard/dashboard.module';
export function loadDashboardModule() { return DashboardModule; }

const routes: Routes = [
  { path: '',redirectTo: 'login',pathMatch: 'full'},
  { path: 'powerbi', loadChildren: loadDashboardModule }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]

})
export class AppRoutingModule { }
