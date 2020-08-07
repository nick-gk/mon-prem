import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  Inject,
  ChangeDetectorRef,
} from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
  Validators,
} from "@angular/forms";
import { Order } from "../../orders.model";
import * as fromApp from "../../../store/app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>,
    private ref: ChangeDetectorRef
  ) {}

  @Output() summaryFormEvent: EventEmitter<{
    group: FormGroup;
    name: string;
  }> = new EventEmitter();

  get avansuri() {
    return this.summaryForm.get("avansArray") as FormArray;
  }

  get reduceri() {
    return this.summaryForm.get("discountArray") as FormArray;
  }

  summaryForm: FormGroup;
  editOrder: Order;

  ngOnInit() {
    this.summaryForm = this.form.group({
      avansArray: this.form.array([]),
      discountArray: this.form.array([]),
      avans: [0],
      tva: [0],
      discount: [0],
      left_amount: [0],
      total: [0],
      //avans: { value: "0", disabled: true },
      // tva: { value: 0, disabled: true },
      // discount: { value: 0, disabled: true },
      // left_amount: { value: 0, disabled: true },
      // total: { value: 0, disabled: true },
    });

    this.store.select("orders").subscribe((orderState) => {
      this.editOrder = orderState.orders[orderState.orderEditIndex];
    });

    if (this.editOrder && this.editOrder.summaryForm) {
      if (this.editOrder.summaryForm.avansArray)
        this.editOrder.summaryForm.avansArray.forEach((el, i) => {
          this.onAddAvans(this.editOrder.summaryForm.avansArray[i]);
        });
      if (this.editOrder.summaryForm.discountArray)
        this.editOrder.summaryForm.discountArray.forEach((el, i) => {
          this.onAddDiscount(this.editOrder.summaryForm.discountArray[i]);
        });
    } else this.onAddAvans();

    this.summaryFormEvent.emit({
      group: this.summaryForm,
      name: "summaryForm",
    });

    this.checkSums();
  }

  onAddDiscount(data?: any) {
    this.reduceri.push(
      this.form.group({
        type: [data ? data.type : "%"],
        discount_amount: [data ? data.discount_amount : 0],
        reason: [data ? data.reason : "", Validators.required],
        discount_date: [data ? data.discount_date : ""],
      })
    );
  }
  ok: boolean = false;
  checkSums() {
    this.summaryForm.get("avansArray").valueChanges.subscribe((avs) => {
      let avansuri: number = 0;
      let tva: number = 0;
      for (let el in avs) {
        avansuri += parseFloat(avs[el].avans_amount);
        if (avs[el].cec === true) tva += parseFloat(avs[el].avans_amount) * 0.2;
      }
      let total = parseFloat(this.summaryForm.get("total").value);
      this.summaryForm.patchValue(
        {
          avans: avansuri.toFixed(2),
          tva: tva.toFixed(2),
          left_amount: (
            total -
            parseFloat(this.summaryForm.get("discount").value) -
            avansuri
          ).toFixed(2),
        },
        { emitEvent: false }
      );
    });
    this.summaryForm.get("discountArray").valueChanges.subscribe((dcs) => {
      let reduceri: number = 0;

      for (let dc in dcs) {
        if (dcs[dc].type === "Lei") {
          reduceri += parseFloat(dcs[dc].discount_amount);
        }

        if (dcs[dc].type === "%") {
          if (this.editOrder && !this.ok) {
            reduceri +=
              (this.editOrder.summaryForm.total *
                parseFloat(dcs[dc].discount_amount)) /
              100;
            this.ok = true;
          } else {
            reduceri +=
              (parseFloat(this.summaryForm.get("total").value) *
                parseFloat(dcs[dc].discount_amount)) /
              100;
          }
        }
      }
      this.summaryForm.patchValue({
        discount: reduceri.toFixed(2),
        left_amount: (
          parseFloat(this.summaryForm.get("total").value) -
          parseFloat(this.summaryForm.get("avans").value) -
          reduceri
        ).toFixed(2),
      });
    });
  }

  onAddAvans(data?: any) {
    this.avansuri.push(
      this.form.group({
        avans_amount: [data ? data.avans_amount : 0],
        cec: [data ? data.cec : false],
        avans_date: [data ? data.avans_date : ""],
      })
    );
  }

  onDeleteAvans(id: number) {
    this.avansuri.removeAt(id);
  }

  onDeleteDiscount(id: number) {
    this.reduceri.removeAt(id);
  }
}
