import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ControlContainer, FormGroup, FormBuilder } from "@angular/forms";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  @Output() customerFormEvent: EventEmitter<FormGroup> = new EventEmitter();

  customerForm: FormGroup;

  ngOnInit() {
    this.customerForm = this.form.group({
      customer_fname: [""],
      customer_lname: [""],
      country: ["Romania"],
      city: [""],
      address: [""],
      cnp: [""],
      customer_tel: [""],
    });
    this.customerFormEvent.emit(this.customerForm);
  }
}
