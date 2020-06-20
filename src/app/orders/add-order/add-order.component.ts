import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
  Output,
  Input,
} from "@angular/core";
import { FormGroup, FormArray, FormBuilder, FormsModule } from "@angular/forms";
import * as OrdersActions from "../store/orders.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Subscription, Observable } from "rxjs";
import { ActivatedRoute, Params } from "@angular/router";
import { Order } from "../orders.model";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent implements OnInit, OnDestroy {
  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: ActivatedRoute
  ) {}

  private storeSub: Subscription;

  orders: {} = null;
  orderForm: FormGroup;
  customerForm: FormGroup;
  deceasedForm: FormGroup;
  summaryForm: FormGroup;
  progressForm: FormGroup;
  elemsForm: FormArray;
  error: string = "";
  editIndex: number = null;
  editOrder: Order = null;
  editMode: boolean = false;

  ngOnChanges() {}

  ngOnInit() {
    this.store.dispatch(new OrdersActions.FetchOrders());

    this.router.params.subscribe((params: Params) => {
      this.storeSub = this.store.select("orders").subscribe((ordersState) => {
        this.orders = ordersState.orders;
        this.error = ordersState.orderError;
        if (this.error) console.log(this.error);

        if (params["id"]) {
          this.editIndex = +params["id"];
          this.editMode = true;
          if (this.orders && this.orders[this.editIndex]) {
            this.editOrder = this.orders[this.editIndex];
            this.createForm(this.editOrder);
          }
        } else {
          this.createForm(null);
        }
      });
    });
  }

  onAddCustomerForm(e) {
    this.customerForm = e;
  }

  onAddDeceasedForm(e) {
    this.deceasedForm = e;
  }
  onAddSummaryForm(e) {
    this.summaryForm = e;
  }
  onAddProgressForm(e) {
    this.progressForm = e;
  }

  onAddElemsForm(e) {
    this.elemsForm = e.controls.elemsArray;
  }

  createForm(data: any) {
    this.orderForm = this.form.group({
      customerForm: this.customerForm,
      deceasedForm: this.deceasedForm,
      elemsForm: this.elemsForm,
      summaryForm: this.summaryForm,
      progressForm: this.progressForm,
    });

    if (data) {
      this.orderForm.patchValue(data);
    }
    this.checkSums();
  }

  ngOnDestroy() {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.orderForm.value);

    if (!this.editMode) {
      this.store.dispatch(new OrdersActions.AddOrder(this.orderForm.value));
      this.orderForm.reset();
    } else {
      this.store.dispatch(
        new OrdersActions.UpdateOrder({
          index: this.editIndex,
          newOrder: this.orderForm.value,
        })
      );
    }
    this.store.dispatch(new OrdersActions.StoreOrders());
  }

  checkSums() {
    if (this.orderForm)
      this.orderForm.valueChanges.subscribe(() => {
        let elems = 0;
        for (let el in (this.orderForm.get("elemsForm") as FormGroup)
          .controls) {
          elems += (this.orderForm.get("elemsForm") as FormGroup).controls[el]
            .value.price;
        }

        let left = 0;
        for (let el in (this.orderForm.get(
          "summaryForm.avansArray"
        ) as FormGroup).controls) {
          left += (this.orderForm.get("summaryForm.avansArray") as FormGroup)
            .controls[el].value.avans;
        }

        this.orderForm.patchValue(
          {
            summaryForm: {
              total: elems,
              left_amount: elems - left,
            },
          },
          { emitEvent: false }
        );
      });
  }
}
