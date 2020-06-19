import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  OnDestroy,
  OnChanges,
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

  orderForm: FormGroup = null;
  customerForm: FormGroup;
  deceasedForm: FormGroup;
  avansArray: FormArray;
  summaryForm: FormGroup;
  progressForm: FormGroup;
  elemsForm: FormArray;
  error: string = "";
  editIndex: number = null;
  editOrder: Order = null;
  editMode: boolean = false;
  loaded: boolean = false;

  get elements() {
    return this.orderForm.get("elemsForm") as FormArray;
  }

  get avansuri() {
    return this.orderForm.get("summaryForm.avansArray") as FormArray;
  }

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
          if (this.orders) this.editOrder = this.orders[this.editIndex];
          if (this.editOrder) this.createForm(this.editOrder);
        } else {
          this.createForm(null);
        }
        this.loaded = true;
      });
    });
  }

  checkSums() {
    if (this.orderForm)
      this.orderForm.valueChanges.subscribe(() => {
        let elems = 0;
        for (let el in this.elements.controls) {
          elems += this.elements.controls[el].value.price;
        }

        let left = 0;
        for (let el in this.avansuri.controls) {
          left += this.avansuri.controls[el].value.avans;
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

  createForm(data: any) {
    this.customerForm = this.form.group({
      customer_fname: [""],
      customer_lname: [""],
      country: ["Romania"],
      city: [""],
      address: [""],
      cnp: [""],
      customer_tel: [""],
    });

    this.deceasedForm = this.form.group({
      d_fname: [""],
      d_sname: [""],
      bdate: [""],
      ddate: [""],
      cemetery: [""],
      cemetery_city: [""],
      cemetery_country: ["Romania"],
    });

    // this.avansArray = this.form.array([
    //   this.form.group({
    //     avans: [0],
    //     avans_date: [],
    //   }),
    // ]);

    this.summaryForm = this.form.group({
      today_date: [],
      due_date: [],
      avansArray: this.form.array([]),
      total: [0],
      left_amount: [0],
      obsc: [""],
    });

    this.progressForm = this.form.group({
      stock: this.form.group({
        checkStock: [],
        responsibleName: [""],
        amount: [],
        obsv: [""],
      }),
      prelucrare: this.form.group({
        checkPrelucrare: [],
        responsibleName: [""],
        amount: [],
        obsv: [""],
      }),
      engraving: this.form.group({
        checkEngraving: [],
        responsibleName: [""],
        amount: [],
        obsv: [""],
      }),
      mounting: this.form.group({
        checkMounting: [],
        responsibleName: [""],
        amount: [],
        obsv: [""],
      }),
    });

    // this.elemsForm = this.form.array([
    //   this.form.group({
    //     article: ["Alege Component"],
    //     quantity: [0],
    //     colour: ["Negru"],
    //     length: [0],
    //     width: [0],
    //     thickness: [0],
    //     uni_price: [0],
    //     expense: [0],
    //     price: [0],
    //   }),
    // ]);

    this.orderForm = this.form.group({
      customerForm: this.customerForm,
      deceasedForm: this.deceasedForm,
      elemsForm: this.form.array([]),
      summaryForm: this.summaryForm,
      progressForm: this.progressForm,
    });

    if (data) {
      this.orderForm.patchValue(data);

      data.elemsForm.forEach((el, i) => {
        this.onAddArticle(data.elemsForm[i]);
      });
    }
    this.checkSums();
  }

  ngOnDestroy() {
    if (this.storeSub) this.storeSub.unsubscribe();
  }

  onSubmit() {
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

  onAddArticle(data: any) {
    this.elements.push(
      this.form.group({
        article: [data !== null ? data.article : ""],
        quantity: [data ? data.quantity : ""],
        colour: [data ? data.colour : ""],
        length: [data ? data.length : ""],
        width: [data ? data.width : ""],
        thickness: [data ? data.thickness : ""],
        uni_price: [data ? data.uni_price : ""],
        expense: [data ? data.expense : ""],
        price: [data ? data.price : ""],
      })
    );
  }
}
