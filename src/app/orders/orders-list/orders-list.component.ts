import { Component, OnInit } from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as OrdersActions from "../store/orders.actions";

@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"],
})
export class OrdersListComponent implements OnInit {
  constructor(private store: Store<fromApp.AppState>) {}

  orders: {};
  orderSub: Subscription;
  ngOnInit() {
    this.orderSub = this.store.select("orders").subscribe((orderState) => {
      this.orders = orderState.orders;
    });
  }

  printOrders() {
    console.log(this.orders);
  }

  fetchOrders() {
    this.store.dispatch(new OrdersActions.FetchOrders());
  }

  storeOrders() {
    this.store.dispatch(new OrdersActions.StoreOrders());
  }
}
