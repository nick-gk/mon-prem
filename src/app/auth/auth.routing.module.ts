import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { LoginComponent } from "./login/login.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { AuthRoleGuard } from "./guards/auth.role.guard";
import { AuthGuard } from "./guards/auth.guard";
import { AuthComponent } from "./auth.component";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { leaveRouteGuard } from "./guards/auth.leaveRoute.guard";

const routes: Routes = [
  {
    path: "auth",
    component: AuthComponent,
    canActivate: [AuthGuard],
    canDeactivate: [leaveRouteGuard],
    children: [
      {
        path: "",
        redirectTo: "login",
        pathMatch: "full",
      },
      {
        path: "login",
        component: LoginComponent,
        canActivate: [AuthGuard],
      },
      {
        path: "users-list",
        component: UsersListComponent,
        canActivate: [AuthGuard],
        data: { roles: ["admin", "manager"] },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
