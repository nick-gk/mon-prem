import { Component, OnInit, Input } from "@angular/core";
import { Order } from "../../orders.model";

@Component({
  selector: "app-order-print-client",
  templateUrl: "./order-print-client.component.html",
})
export class OrderPrintClientComponent implements OnInit {
  @Input() print: string;

  @Input() order: Order;

  constructor() {}

  ngOnInit() {
    console.log(this.print);
  }

  printPage(type: string) {
    this.print = type;
  }
}
