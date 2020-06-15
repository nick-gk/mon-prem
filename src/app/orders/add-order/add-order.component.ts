import {
  Component,
  OnInit,
  Output,
  ChangeDetectionStrategy,
} from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder,
} from "@angular/forms";
import * as OrdersActions from "../store/orders.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Subscription, Observable } from "rxjs";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddOrderComponent implements OnInit {
  error: string = "";

  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}

  orders: {};

  orderForm: FormGroup;

  get elements() {
    return this.orderForm.get("elemsForm") as FormArray;
  }

  get avansuri() {
    return this.orderForm.get("summaryForm.avansArray") as FormArray;
  }

  private storeSub: Subscription;

  customerForm: FormGroup = this.form.group({
    customer_fname: [""],
    customer_lname: [""],
    country: ["Romania"],
    city: [""],
    address: [""],
    cnp: [""],
    customer_tel: [""],
  });

  deceasedForm: FormGroup = this.form.group({
    d_fname: [""],
    d_sname: [""],
    bdate: [""],
    ddate: [""],
    cemetery: [""],
    cemetery_city: [""],
    cemetery_country: ["Romania"],
  });

  avansArray: FormArray = this.form.array([
    this.form.group({
      avans: [],
      avans_date: [],
    }),
  ]);

  summaryForm: FormGroup = this.form.group({
    today_date: [],
    due_date: [],
    avansArray: this.avansArray,
    total: [],
    left_amount: [],
    obsc: [""],
  });

  progressForm: FormGroup = this.form.group({
    stock: this.form.group({
      checkStock: [],
      responsibleName: [],
      amount: [],
      obsv: [],
    }),
    prelucrare: this.form.group({
      checkPrelucrare: [],
      responsibleName: [],
      amount: [],
      obsv: [],
    }),
    engraving: this.form.group({
      checkEngraving: [],
      responsibleName: [],
      amount: [],
      obsv: [],
    }),
    mounting: this.form.group({
      checkMounting: [],
      responsibleName: [],
      amount: [],
      obsv: [],
    }),
  });

  elemsForm: FormArray = this.form.array([
    this.form.group({
      article: ["Alege Component"],
      quantity: [0],
      colour: ["Negru"],
      length: [0],
      width: [0],
      thickness: [0],
      uni_price: [0],
      price: [0],
    }),
  ]);

  ngOnInit() {
    this.storeSub = this.store.select("orders").subscribe((ordersState) => {
      this.error = ordersState.orderError;
      if (this.error) console.log(this.error);
    });

    this.orderForm = this.form.group({
      customerForm: this.customerForm,
      deceasedForm: this.deceasedForm,
      elemsForm: this.elemsForm,
      summaryForm: this.summaryForm,
      progressForm: this.progressForm,
    });
  }

  onSubmit() {
    this.store.dispatch(new OrdersActions.AddOrder(this.orderForm.value));
    this.orderForm.reset();

    console.log(this.orderForm);
    this.storeSub.unsubscribe();
  }

  onAddArticle() {
    this.elements.push(
      this.form.group({
        article: [],
        quantity: [0],
        colour: ["Negru"],
        length: [0],
        width: [0],
        thickness: [0],
        uni_price: [0],
        price: [0],
      })
    );
  }
}
