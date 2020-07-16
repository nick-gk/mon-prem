import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Order } from "../../orders.model";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  @Output() customerFormEvent = new EventEmitter<{
    group: FormGroup;
    name: string;
  }>();

  customerForm: FormGroup;

  ngOnInit() {
    this.customerForm = this.form.group({
      customer_fname: [""],
      country: ["Romania"],
      city: [""],
      address: [""],
      cnp: [""],
      customer_tel: [""],
    });
    this.customerFormEvent.emit({
      group: this.customerForm,
      name: "customerForm",
    });
  }
}
