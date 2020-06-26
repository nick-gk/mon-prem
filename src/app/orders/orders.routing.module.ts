import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders.component";
import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";
import { OrdersResolver } from "./orders-resolver.service";
import { ArticleComponent } from "./add-order/article/article.component";
import { ClientDetailsComponent } from "./add-order/client-details/client-details.component";

const routes: Routes = [
  {
    path: "orders",
    component: OrdersComponent,
    canActivate: [AuthGuard],
    children: [
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
