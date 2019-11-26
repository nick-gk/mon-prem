import { Routes, RouterModule } from "@angular/router";
import { OrdersComponent } from "./orders.component";
import { AuthGuard } from "../auth/auth.guard";
import { NgModule } from "@angular/core";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";

const routes: Routes = [
  {
    path: "",
    component: OrdersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "add-order",
        component: AddOrderComponent
      },
      {
        path: "orders-list",
        component: OrdersListComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}
