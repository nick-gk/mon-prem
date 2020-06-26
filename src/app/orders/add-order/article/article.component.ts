import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ControlContainer,
  FormArray,
  FormGroup,
  FormBuilder,
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
  // elemsArray: FormArray;

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
      this.orderForm.elemsForm.forEach((el, i) => {
        this.onAddArticle(this.orderForm.elemsForm[i]);
      });
    }
    this.elemsFormEvent.emit(this.elemsForm);
  }
  components: Array<string> = [
    "Monument",
    "Placaj superior stanga",
    "Placaj superior dreapta",
    "Placaj superior cap",
    "Placaj superior picioare",
    "Placaj lateral stanga",
    "Placaj lateral dreapta",
    "Placaj lateral cap",
    "Placaj lateral picioare",
    "Stalp",
    "Capac",
    "Vaza",
    "Felinar",
    "Fotogravura",
    "Cruce",
    "Elemente Fotogravura",
    "Forme",
    "Montare",
    "Placare Trotuar",
    "Fotoceramica",
    "Transport",
    "Taiere placaj",
    "Cant",
  ];

  onAddArticle(data: any) {
    this.elements.push(
      this.form.group({
        article: [data !== null ? data.article : "Monument"],
        quantity: [data ? data.quantity : 0],
        colour: [data ? data.colour : "Negru"],
        length: [data ? data.length : 0],
        width: [data ? data.width : 0],
        thickness: [data ? data.thickness : 0],
        uni_price: [data ? data.uni_price : 0],
        expense: [data ? data.expense : 0],
        price: [data ? data.price : 0],
      })
    );
  }
}
