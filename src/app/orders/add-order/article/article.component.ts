import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import {
  ControlContainer,
  FormArray,
  FormGroup,
  FormBuilder,
} from "@angular/forms";
import { Order } from "../../orders.model";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private form: FormBuilder
  ) {}

  @Input() editOrder: Order;

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

    if (this.editOrder) {
      this.editOrder.elemsForm.forEach((el, i) => {
        this.onAddArticle(this.editOrder.elemsForm[i]);
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
