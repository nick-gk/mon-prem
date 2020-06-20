import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ControlContainer, FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-deceased-details",
  templateUrl: "./deceased-details.component.html",
  styleUrls: ["./deceased-details.component.css"],
})
export class DeceasedDetailsComponent implements OnInit {
  constructor(
    private controlContainer: ControlContainer,
    private form: FormBuilder
  ) {}

  @Output() deceasedFormEvent: EventEmitter<FormGroup> = new EventEmitter();

  deceasedForm: FormGroup;

  ngOnInit() {
    this.deceasedForm = this.form.group({
      d_fname: [""],
      d_sname: [""],
      bdate: [""],
      ddate: [""],
      cemetery: [""],
      cemetery_city: [""],
      cemetery_country: ["Romania"],
    });
    this.deceasedFormEvent.emit(this.deceasedForm);
  }
}
