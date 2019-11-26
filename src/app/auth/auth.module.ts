import { NgModule } from '@angular/core';
import { AuthComponent } from './auth.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';

@NgModule({
  declarations: [AuthComponent],
  imports: [
    RouterModule.forChild([
      { path: '', component: AuthComponent, canActivate: [AuthGuard] }
    ]),
    CommonModule,
    FormsModule
  ]
})
export class AuthModule {}
