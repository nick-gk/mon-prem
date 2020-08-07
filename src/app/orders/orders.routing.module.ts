import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders.component";
import { NgModule } from "@angular/core";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersResolver } from "./orders-resolver.service";
import { ArticleComponent } from "./add-order/article/article.component";
import { ClientDetailsComponent } from "./add-order/client-details/client-details.component";
import { OrderComponent } from "./order/order.component";
import { AngularFireAuthGuard } from "@angular/fire/auth-guard";
import { AuthRoleGuard } from "../auth/guards/auth.role.guard";

const routes: Routes = [
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AngularFireAuthGuard],
    children: [
      {
        path: "",
        redirectTo: "orders-list",
        pathMatch: "full",
      },
      {
        path: "add-order",
        component: AddOrderComponent,
      },
      {
        path: "orders-list",
        component: OrdersListComponent,
        resolve: { orders: OrdersResolver },
      },
      {
        path: ":id",
        component: OrderComponent,
        resolve: { orders: OrdersResolver },
      },
      {
        path: ":id/edit",
        component: AddOrderComponent,
        resolve: { orders: OrdersResolver },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrdersRoutingModule {}
