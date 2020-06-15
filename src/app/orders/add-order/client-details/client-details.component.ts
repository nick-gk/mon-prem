import { Component, OnInit } from "@angular/core";
import { ControlContainer } from "@angular/forms";

@Component({
  selector: "app-client-details",
  templateUrl: "./client-details.component.html",
  styleUrls: ["./client-details.component.css"],
})
export class ClientDetailsComponent implements OnInit {
  constructor(private controlContainer: ControlContainer) {}

  ngOnInit() {}
}
