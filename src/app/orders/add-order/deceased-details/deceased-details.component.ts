import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import {
  ControlContainer,
  FormBuilder,
  FormGroup,
  FormArray,
} from "@angular/forms";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import { Order } from "../../orders.model";

@Component({
  selector: "app-deceased-details",
  templateUrl: "./deceased-details.component.html",
  styleUrls: ["./deceased-details.component.css"],
})
export class DeceasedDetailsComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  orderForm: Order;

  get decs() {
    return this.deceasedForm.get("decsArray") as FormArray;
  }

  @Output() deceasedFormEvent: EventEmitter<{
    group: FormGroup;
    name: string;
  }> = new EventEmitter();

  deceasedForm: FormGroup;

  ngOnInit() {
    this.deceasedForm = this.form.group({
      decsArray: this.form.array([]),
    });

    this.store.select("orders").subscribe((orderState) => {
      this.orderForm = orderState.orders[orderState.orderEditIndex];
    });

    if (this.orderForm) {
      this.orderForm.deceasedForm.forEach((el, i) => {
        this.onAddDeceased(this.orderForm.deceasedForm[i]);
      });
    } else this.onAddDeceased();

    this.deceasedFormEvent.emit({
      group: this.deceasedForm,
      name: "deceasedForm",
    });
  }

  onAddDeceased(data?: any) {
    this.decs.push(
      this.form.group({
        d_fname: [data ? data.d_fname : ""],
        d_sname: [data ? data.d_sname : ""],
        bdate: [data ? data.bdate : ""],
        ddate: [data ? data.ddate : ""],
        cemetery: [data ? data.cemetery : ""],
        cemetery_city: [data ? data.cemetery_city : ""],
        cemetery_country: [data ? data.cemetery_country : ""],
        epitaf: [data ? data.epitaf : ""],
      })
    );
  }

  onDelete(id: number) {
    this.decs.removeAt(id);
  }
}
