import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { Order } from "../orders/orders.model";
import * as OrdersActions from "../orders/store/orders.actions";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(private store: Store<fromApp.AppState>) {}
  orders: Order[];
  orderSub: Subscription;
  total: number = 0;
  expenses: number = 0;
  gross_margin: number = 0;
  gross_marginP: number = 0;
  nrOrders: number = 0;
  AvgRevenue: number = 0;
  AvgMargin: number = 0;
  AvgPeriod: number = 0;

  ngOnInit() {
    this.orderSub = this.store.select("orders").subscribe((orderState) => {
      this.orders = orderState.orders;
      if (!this.orders) this.store.dispatch(new OrdersActions.FetchOrders());

      this.orders.forEach((element) => {
        this.nrOrders++;
        this.total += element.summaryForm.total;
        element.elemsForm.forEach((el) => {
          if (el.expense) this.expenses += el.expense;
        });
        this.gross_margin = this.total - this.expenses;
        this.gross_marginP = (this.total - this.expenses) / this.total;
        this.AvgRevenue = this.total / this.nrOrders;
        this.AvgMargin = this.gross_margin / this.nrOrders;
        this.AvgPeriod = 45;
      });
    });
  }

  ngOnDestroy() {
    this.orderSub.unsubscribe();
  }
}
