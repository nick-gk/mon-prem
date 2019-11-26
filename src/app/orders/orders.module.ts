import { NgModule } from "@angular/core";
import { OrdersComponent } from "./orders.component";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { OrdersRoutingModule } from "./orders.routing.module";
import { RouterModule } from "@angular/router";
import { AddOrderComponent } from "./add-order/add-order.component";
import { OrdersListComponent } from "./orders-list/orders-list.component";

@NgModule({
  declarations: [OrdersComponent, AddOrderComponent, OrdersListComponent],
  imports: [
    OrdersRoutingModule,
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ]
})
export class OrdersModule {}
