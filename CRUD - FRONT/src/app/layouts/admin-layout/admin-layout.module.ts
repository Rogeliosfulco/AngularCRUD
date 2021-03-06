import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../componentes/dashboard/dashboard.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    NgbModule
  ],
  declarations: [
    DashboardComponent
  ]
})

export class AdminLayoutModule { }
