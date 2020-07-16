import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "app-termeni",
  templateUrl: "./termeni.component.html",
  styleUrls: ["./termeni.component.css"],
})
export class TermeniComponent implements OnInit {
  constructor(private form: FormBuilder) {}

  @Output() termeniFormEvent: EventEmitter<{
    group: FormGroup;
    name: string;
  }> = new EventEmitter();

  termeniForm: FormGroup;

  today: Date = new Date();
  due_date: Date = new Date(this.today);

  ngOnInit() {
    this.due_date.setMonth(this.due_date.getMonth() + 1);
    this.termeniForm = this.form.group({
      today_date: [""],
      due_date: [""],
      obsv: [""],
    });

    this.termeniFormEvent.emit({
      group: this.termeniForm,
      name: "termeniForm",
    });
  }
}
