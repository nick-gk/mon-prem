import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrdersRoutingModule } from "./orders.routing.module";
import { RouterModule } from "@angular/router";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { ArticleComponent } from "./add-order/article/article.component";
import { ClientDetailsComponent } from "./add-order/client-details/client-details.component";
import { DeceasedDetailsComponent } from "./add-order/deceased-details/deceased-details.component";
import { ImagesComponent } from "./add-order/images/images.component";
import { ProgressComponent } from "./add-order/progress/progress.component";
import { SummaryComponent } from "./add-order/summary/summary.component";
import { OrdersResolver } from "./orders-resolver.service";
import { TermeniComponent } from "./add-order/termeni/termeni.component";
import { AngularFireModule } from "@angular/fire";
import { environment } from "src/environments/environment";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { OrderComponent } from "./order/order.component";
import { OrderPrintClientComponent } from "./order/order-print-client/order-print-client.component";
import { AngularFireAuthGuardModule } from "@angular/fire/auth-guard/";
import { SharedModule } from "../shared/shared.module";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [
    OrdersComponent,
    AddOrderComponent,
    OrdersListComponent,
    ArticleComponent,
    ClientDetailsComponent,
    DeceasedDetailsComponent,
    ImagesComponent,
    ProgressComponent,
    SummaryComponent,
    TermeniComponent,
    OrderComponent,
    OrderPrintClientComponent,
  ],
  imports: [
    OrdersRoutingModule,
    CommonModule,
    SharedModule,
    RouterModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    AngularFireAuthGuardModule,
  ],
  providers: [OrdersResolver],
})
export class OrdersModule {}
