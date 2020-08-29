import { NgModule } from "@angular/core";
import { DashboardComponent } from "./dashboard.component";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { AuthRoleGuard } from "../auth/guards/auth.role.guard";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AngularFireAuthGuard, AuthRoleGuard],
        data: { roles: ["Admin"] },
      },
    ]),
  ],
})
export class DashboardModule {}
