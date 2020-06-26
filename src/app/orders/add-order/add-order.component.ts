import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  AfterContentInit,
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
    private route: Router
  ) {}

  private storeSub: Subscription;

  orders: Order[] = null;
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
  loaded: boolean = false;

  ngOnInit() {
    this.orderForm = this.form.group({});
    this.router.params.subscribe((params: Params) => {
      if (params["id"]) {
        this.editIndex = +params["id"];
        this.editMode = true;

        this.store.dispatch(new OrdersActions.StartEdit(this.editIndex));
      }
    });
  }

  ngAfterContentInit() {}

  ngAfterViewInit() {
    this.createForm(this.editIndex != null ? this.editIndex : null);
  }

  ngAfterViewChecked() {}

  onAddForm(e) {
    eval("this." + e.name + " = e.group;");
  }

  onAddElemsForm(e) {
    this.elemsForm = e.controls.elemsArray;
  }

  createForm(id?: number) {
    this.orderForm = this.form.group({
      customerForm: this.customerForm,
      deceasedForm: this.deceasedForm,
      elemsForm: this.elemsForm,
      summaryForm: this.summaryForm,
      progressForm: this.progressForm,
    });

    if (id) {
      this.storeSub = this.store
        .select("orders")
        .pipe(
          map((orderState) => {
            return orderState.orders.find((order, index) => {
              return index === id;
            });
          })
        )
        .subscribe((order) => {
          this.orderForm.patchValue(order);
        });
    }

    this.checkSums();
  }

  cancel() {
    this.route.navigate(["orders/orders-list"]);
  }

  ngOnDestroy() {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit() {
    console.log(this.orderForm);

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
    this.route.navigate(["orders/orders-list"]);
  }

  checkSums() {
    this.orderForm.valueChanges.subscribe(() => {
      let elems: number = 0;
      let left: number = 0;
      var avansuri = (this.orderForm.get("summaryForm.avansArray") as FormGroup)
        .controls;
      var elements = (this.orderForm.get("elemsForm") as FormGroup).controls;

      for (let el in elements) elems += elements[el].value.price;

      for (let el in avansuri) left += avansuri[el].value.avans;

      this.orderForm.get("summaryForm").patchValue(
        {
          total: elems,
          left_amount: elems - left,
        },
        { emitEvent: false }
      );
    });
  }
}
