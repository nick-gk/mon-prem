import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
  ChangeDetectorRef,
} from "@angular/core";
import { FormGroup, FormArray, FormBuilder, FormsModule } from "@angular/forms";
import * as OrdersActions from "../store/orders.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Subscription, Observable } from "rxjs";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";
import { Order } from "../orders.model";
import { map } from "rxjs/operators";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent
  implements
    OnInit,
    OnDestroy,
    AfterContentInit,
    AfterViewChecked,
    AfterViewInit {
  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>,
    private router: ActivatedRoute,
    private route: Router,
    private ref: ChangeDetectorRef
  ) {}

  private storeSub: Subscription;

  orders: Order[] = null;
  orderForm: FormGroup;
  id: number = null;
  customerForm: FormGroup;
  deceasedForm: FormArray;
  summaryForm: FormGroup;
  termeniForm: FormGroup;
  progressForm: FormGroup;
  elemsForm: FormArray;
  error: string = "";
  editIndex: number = null;
  editOrder: Order = null;
  editMode: boolean = false;
  loaded: boolean = false;

  ngOnInit() {
    this.orderForm = this.form.group({});

    this.router.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.editIndex = +params["id"];
        this.id = this.editIndex;
        this.editMode = true;
        this.store.dispatch(new OrdersActions.StartEdit(this.editIndex));
      }
    });

    this.storeSub = this.store.select("orders").subscribe((orderState) => {
      this.orders = orderState.orders;
      if (!this.editMode) this.id = this.orders.length;
    });
  }

  ngAfterContentInit() {}

  ngAfterViewInit() {
    this.createForm(this.editIndex != null ? this.editIndex : null);
  }

  ngAfterViewChecked() {}

  onAddForm(e) {
    this[e.name] = e.group;
  }

  onAddDecsForm(e) {
    this.deceasedForm = e.group.controls.decsArray;
  }

  onAddElemsForm(e) {
    this.elemsForm = e.controls.elemsArray;
  }

  createForm(id?: number) {
    this.orderForm = this.form.group({
      id: [this.id],
      customerForm: this.customerForm,
      deceasedForm: this.deceasedForm,
      elemsForm: this.elemsForm,
      termeniForm: this.termeniForm,
      summaryForm: this.summaryForm,
      //progressForm: [],
      progressForm: this.progressForm,
    });

    if (id !== null) {
      this.orderForm.patchValue(this.orders[id]);
    }

    this.checkSums();
  }

  cancel() {
    this.route.navigate(["orders/orders-list"]);
  }

  ngOnDestroy() {
    this.store.dispatch(new OrdersActions.StopEdit());
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.orderForm.value);

    if (!this.editMode) {
      this.store.dispatch(new OrdersActions.AddOrder(this.orderForm.value));
    } else {
      this.store.dispatch(
        new OrdersActions.UpdateOrder({
          index: this.editIndex,
          newOrder: this.orderForm.value,
        })
      );
      this.store.dispatch(new OrdersActions.StopEdit());
    }
    this.store.dispatch(new OrdersActions.StoreOrders());
    if (!this.editMode) this.route.navigate(["orders/" + (this.id - 1)]);
    else {
      this.route.navigate(["orders/" + this.id]);
    }
  }

  checkSums() {
    this.orderForm.get("elemsForm").valueChanges.subscribe((els) => {
      let elems: number = 0;
      els.forEach((el, i) => {
        let price: number = el.uni_price * el.quantity;
        elems += price;
        (this.orderForm.get("elemsForm") as FormArray).controls[i].patchValue(
          {
            price: price.toFixed(2),
          },
          { emitEvent: false }
        );
      });

      this.orderForm.get("summaryForm").patchValue(
        {
          total: elems.toFixed(2),
          left_amount: (
            elems -
            parseFloat(this.orderForm.get("summaryForm.discount").value) -
            parseFloat(this.orderForm.get("summaryForm.avans").value)
          ).toFixed(2),
        },
        { emitEvent: false }
      );
    });
  }
}
