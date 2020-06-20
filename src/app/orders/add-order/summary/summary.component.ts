import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, FormControl, FormArray } from "@angular/forms";
import { Order } from "../../orders.model";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  @Output() summaryFormEvent: EventEmitter<FormGroup> = new EventEmitter();

  get avansuri() {
    return this.summaryForm.get("avansArray") as FormArray;
  }

  summaryForm: FormGroup;

  @Input() editOrder: Order;

  ngOnInit() {
    this.summaryForm = this.form.group({
      today_date: [],
      due_date: [],
      avansArray: this.form.array([]),
      total: [0],
      left_amount: [0],
      obsc: [""],
    });

    if (this.editOrder) {
      this.editOrder.summaryForm.avansArray.forEach((el, i) => {
        this.onAddAvans(this.editOrder.summaryForm.avansArray[i]);
      });
    }

    this.summaryFormEvent.emit(this.summaryForm);
  }

  onAddAvans(data: any) {
    this.avansuri.push(
      this.form.group({
        avans: [data != null ? data.avans : ""],
        avans_date: [data != null ? data.avans_date : null],
      })
    );
  }

  onDeleteAvans(id: number) {
    this.avansuri.removeAt(id);
  }
}
