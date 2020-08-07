import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../User";
import { Subscription } from "rxjs";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(private http: HttpClient) {}

  sub: Subscription;
  users: User[];
  ngOnInit() {
    this.sub = this.http
      .get<{ users: User[] }>(
        "https://us-central1-mon-prem.cloudfunctions.net/api/users/"
      )
      .subscribe((res) => {
        this.users = res.users;
      });
  }

  setRole() {
    this.http
      .patch(
        `https://us-central1-mon-prem.cloudfunctions.net/api/users/${this.users[0].uid}`,
        { email: this.users[0].email, role: "manager" }
      )
      .subscribe((res) => {
        console.log(res);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
