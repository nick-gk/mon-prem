import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { AuthComponent } from "./auth.component";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { LoginComponent } from "./login/login.component";
import { UsersListComponent } from "./users-list/users-list.component";
import { HeaderModule } from "../header/header.module.module";
import { AuthRoutingModule } from "./auth.routing.module";
import { UserPageComponent } from "./user/user-page/user-page.component";
import { UserEditComponent } from "./user/user-edit/user-edit.component";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    AuthComponent,
    LoginComponent,
    UsersListComponent,
    UserPageComponent,
    UserEditComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    SharedModule,
    AngularFireAuthGuardModule,
    ReactiveFormsModule,
    AuthRoutingModule,
    HeaderModule,
  ],
  exports: [AuthComponent],
})
export class AuthModule {}
