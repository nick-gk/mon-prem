import { Component, OnInit, Input } from "@angular/core";
import {
  ControlContainer,
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
} from "@angular/forms";
import { Order } from "../../orders.model";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private form: FormBuilder
  ) {}

  @Input() avansuri: FormArray;
  @Input() editOrder: Order;

  ngOnInit() {
    if (this.editOrder) {
      this.editOrder.summaryForm.avansArray.forEach((el, i) => {
        this.onAddAvans(this.editOrder.summaryForm.avansArray[i]);
      });
    }
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
