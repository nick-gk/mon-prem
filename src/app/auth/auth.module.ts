import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { LoginComponent } from "./login/login.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { HeaderModule } from "../header/header.module.module";
import { AuthRoutingModule } from "./auth.routing.module";

@NgModule({
  declarations: [AuthComponent, LoginComponent, UsersListComponent],
  imports: [
    FormsModule,
    CommonModule,
    AngularFireAuthGuardModule,
    AuthRoutingModule,
    HeaderModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
