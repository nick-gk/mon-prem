import { Component, OnInit } from "@angular/core";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import * as OrdersActions from "../store/orders.actions";
import { Order } from "../orders.model";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: "app-orders-list",
  templateUrl: "./orders-list.component.html",
  styleUrls: ["./orders-list.component.css"],
})
export class OrdersListComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {}

  orders: Order[];
  orderSub: Subscription;
  disabled: boolean;
  ngOnInit() {
    this.spinner.show();
    this.orderSub = this.store.select("orders").subscribe((orderState) => {
      this.orders = orderState.orders;
      if (this.orders) this.spinner.hide();
    });
  }
}
