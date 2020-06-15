import { Component, OnInit, Input } from "@angular/core";
import { ControlContainer, FormArray } from "@angular/forms";

@Component({
  selector: "app-article",
  templateUrl: "./article.component.html",
  styleUrls: ["./article.component.css"],
})
export class ArticleComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) {}
  @Input() elements: FormArray;

  onDelete(id: number) {
    this.elements.removeAt(id);
  }

  ngOnInit() {}
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
}
