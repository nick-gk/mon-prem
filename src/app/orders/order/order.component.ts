import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Order } from "../orders.model";
@Component({
  selector: "app-order",
  templateUrl: "./order.component.html",
  styleUrls: ["./order.component.css"],
})
export class OrderComponent implements OnInit {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  order: Order;
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      if (params["id"]) {
        const id = +params["id"];
        this.store.select("orders").subscribe((orderState) => {
          this.order = orderState.orders[id];
        });
      } else {
        console.log("No id parameter provided;");
      }
    });
  }

  onEdit() {
    this.router.navigate(["edit"], { relativeTo: this.route });
  }
}
