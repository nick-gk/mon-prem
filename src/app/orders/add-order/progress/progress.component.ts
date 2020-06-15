import { Component, OnInit } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"],
})
export class ProgressComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {}
}
