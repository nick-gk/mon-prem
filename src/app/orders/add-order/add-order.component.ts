import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormArray,
  FormBuilder
} from "@angular/forms";

@Component({
  selector: "app-add-order",
  templateUrl: "./add-order.component.html",
  styleUrls: ["./add-order.component.css"]
})
export class AddOrderComponent implements OnInit {
  get elements() {
    return this.orderForm.get("elemsForm") as FormArray;
  }

  constructor(private form: FormBuilder) {}
  orderForm: FormGroup;
  element: FormGroup;

  ngOnInit() {
    this.element = new FormGroup({});

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
          article: [""],
          quantity: [""],
          colour: [""],
          length: [""],
          width: [""],
          thickness: [""],
          uni_price: [""],
          price: [""]
        })
      ]),
      summaryForm: this.form.group({
        in_stock: [""],
        add_image: [""],
        today_date: [""],
        due_date: [""],
        avans: [""],
        total: [""]
      })
    });
  }

  onSubmit() {
    console.log(this.orderForm);
  }

  onAddArticle() {
    this.elements.push(
      this.form.group({
        article: [""],
        quantity: [""],
        colour: [""],
        length: [""],
        width: [""],
        thickness: [""],
        uni_price: [""],
        price: [""]
      })
    );
  }
}
