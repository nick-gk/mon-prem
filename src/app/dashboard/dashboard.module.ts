import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthGuard } from "../auth/auth.guard";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuard]
      }
    ])
  ]
})
export class DashboardModule {}
