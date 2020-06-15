import { Component, OnInit } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
  selector: "app-deceased-details",
  templateUrl: "./deceased-details.component.html",
  styleUrls: ["./deceased-details.component.css"],
})
export class DeceasedDetailsComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {}
}
