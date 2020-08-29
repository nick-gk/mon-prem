import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { AppComponent } from "./app.component";
import { StoreModule } from "@ngrx/store";
import * as fromApp from "./store/app.reducer";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { EffectsModule } from "@ngrx/effects";
import { AuthEffects } from "./auth/store/auth.effects";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";
import { OrdersModule } from "./orders/orders.module";
import { AuthModule } from "./auth/auth.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { OrdersEffects } from "./orders/store/orders.effects";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { HeaderModule } from "./header/header.module.module";
import { RouterModule } from "@angular/router";
import { SharedModule } from "./shared/shared.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    AuthModule,
    DashboardModule,
    SharedModule,
    OrdersModule,
    HeaderModule,
    AngularFireAuthModule,
    RouterModule,
    StoreModule.forRoot(fromApp.appReducer),
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, OrdersEffects]),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
