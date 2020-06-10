import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder
} from "@angular/forms";
import * as OrdersActions from "../store/orders.actions";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Subscription } from "rxjs";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"]
})
export class AddOrderComponent implements OnInit {
  get elements() {
    return this.orderForm.get("elemsForm") as FormArray;
  }
  error: string = null;
  constructor(
    private form: FormBuilder,
    private store: Store<fromApp.AppState>
  ) {}
  orderForm: FormGroup;
  component: FormGroup;
  components: Array<string> = ["Monument", "Placa"];

  private storeSub: Subscription;
  ngOnInit() {
    // this.storeSub = this.store.select("orders").subscribe(ordersState => {
    //   this.error = ordersState.orderError;
    //   if (this.error) console.log(this.error);
    // });

    this.orderForm = this.form.group({
      customerForm: this.form.group({
        customer_fname: [""],
        customer_lname: [""],
        country: ["Romania"],
        city: [""],
        address: [""],
        cnp: [""],
        customer_tel: [""]
      }),
      deadForm: this.form.group({
        d_fname: [""],
        d_sname: [""],
        bdate: [""],
        ddate: [""],
        cemetery: [""],
        cemetery_city: [""],
        cemetery_country: ["Romania"]
      }),
      elemsForm: this.form.array([
        this.form.group({
          article: ["Component"]
        })
      ]),
      summaryForm: this.form.group({
        add_image: [""],
        today_date: [""],
        due_date: [""],
        avans: [],
        total: [],
        obsc: [""]
      }),
      progressForm: this.form.group({
        stage1: [false],
        stage2: [false],
        stage3: [false],
        stage4: [false],
        obsp: [""]
      })
    });
  }

  onSubmit() {
    console.log(this.orderForm);
    console.log(this.orderForm.value);
    //this.store.dispatch(new OrdersActions.AddOrder(this.orderForm.value));
    this.orderForm.reset();
  }

  onAddArticle() {
    this.elements.push(
      this.form.group({
        article: ["Monument"],
        quantity: [],
        colour: ["Negru"],
        length: [],
        width: [],
        thickness: [],
        uni_price: [],
        price: []
      })
    );
  }
}
