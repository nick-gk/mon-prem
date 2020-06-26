import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"],
})
export class ProgressComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  @Output() progressFormEvent: EventEmitter<{
    group: FormGroup;
    name: string;
  }> = new EventEmitter();

  progressForm: FormGroup;

  ngOnInit() {
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

    this.progressFormEvent.emit({
      group: this.progressForm,
      name: "progressForm",
    });
  }
}
