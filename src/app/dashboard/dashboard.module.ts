import { NgModule } from '@angular/core';
import { DashboardComponent } from './dashboard.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard.routing.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [RouterModule, FormsModule, CommonModule, DashboardRoutingModule]
})
export class DashboardModule {}
