import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ControlContainer,
  FormArray,
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { Order } from "../../orders.model";
import { ActivatedRoute, Data } from "@angular/router";
import * as fromApp from "../../../store/app.reducer";
import { Store } from "@ngrx/store";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private form: FormBuilder,
    private router: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  orderForm: Order;

  @Output() elemsFormEvent: EventEmitter<FormGroup> = new EventEmitter();

  elemsForm: FormGroup;

  get elements() {
    return this.elemsForm.get("elemsArray") as FormArray;
  }

  onDelete(id: number) {
    this.elements.removeAt(id);
  }

  ngOnInit() {
    this.elemsForm = this.form.group({
      elemsArray: this.form.array([]),
    });

    this.store.select("orders").subscribe((orderState) => {
      this.orderForm = orderState.orders[orderState.orderEditIndex];
    });

    if (this.orderForm) {
      if (this.orderForm.elemsForm)
        this.orderForm.elemsForm.forEach((el, i) => {
          this.onAddArticle(this.orderForm.elemsForm[i]);
        });
    }

    this.checkSums();

    this.elemsFormEvent.emit(this.elemsForm);
  }
  components: Array<string> = [
    "Monument",
    "Postament",
    "Florar",
    "Plita",
    "Fețuire",
    "Cant",
    "Vaza",
    "Felinar",
    "Fotogravura",
    "Elemente Fotogravura",
    "Fotoceramica",
    "Inscripție",
    "Cruce gravură",
    "Cruce metal",
    "Montare",
    "Placare Trotuar",
    "Transport",
    "Demontare",
    "Gard Fier",
    "Taiere placaj",
  ];

  onAddArticle(data?: any) {
    if (!data) data = null;
    this.elements.push(
      this.form.group({
        price: [data !== null ? data.price : 0],
        article: [data !== null ? data.article : ""],
        quantity: [data !== null ? data.quantity : 1],
        desc: [data !== null ? data.desc : ""],
        uni_price: [data !== null ? data.uni_price : 0],
      })
    );
  }

  checkSums() {
    this.elements.valueChanges.subscribe((els) => {
      els.forEach((el, i) => {
        (this.elemsForm.get("elemsArray") as FormArray).controls[i].patchValue(
          {
            price: (el.uni_price * el.quantity).toFixed(2),
          },
          { emitEvent: false }
        );
      });
    });
  }
}
