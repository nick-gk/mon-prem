import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AuthGuard } from "./auth.guard";
import { RouterModule } from "@angular/router";

@NgModule({
  declarations: [AuthComponent],
  imports: [
    FormsModule,
    CommonModule,
    RouterModule.forChild([
      {
        path: "auth",
        component: AuthComponent,
        canActivate: [AuthGuard]
      }
    ])
  ],
  exports: [AuthComponent]
})
export class AuthModule {}
