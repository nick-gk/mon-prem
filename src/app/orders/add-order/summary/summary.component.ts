import { Component, OnInit, Input } from "@angular/core";
import {
  ControlContainer,
  FormGroup,
  FormBuilder,
  FormControl,
  FormArray,
} from "@angular/forms";

@Component({
  selector: "app-summary",
  templateUrl: "./summary.component.html",
  styleUrls: ["./summary.component.css"],
})
export class SummaryComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private form: FormBuilder
  ) {}

  @Input() avansuri: FormArray;

  ngOnInit() {
    //console.log(this.avansuri);
  }

  onAddAvans() {
    this.avansuri.push(
      this.form.group({
        avans: [],
        avans_date: [],
      })
    );
    //console.log(this.avansuri);
  }

  onDeleteAvans(id: number) {
    this.avansuri.removeAt(id);
  }
}
