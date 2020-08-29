import { Component, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { User } from "../User";
import { Subscription } from "rxjs";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { Profile } from "../Profile";
import * as AuthActions from "../store/auth.actions";
import { Account } from "../Account";
import * as Departments from "../user/user-edit/Departments";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-users-list",
  templateUrl: "./users-list.component.html",
  styleUrls: ["./users-list.component.css"],
})
export class UsersListComponent implements OnInit, OnDestroy {
  constructor(
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private spinner: NgxSpinnerService
  ) {}

  sub: Subscription;
  keys: any;
  accounts: Account[];
  departments = Departments.Departments;

  ngOnInit() {
    this.spinner.show();
    this.store.dispatch(new AuthActions.RequestAccounts());
    this.sub = this.store.select("auth").subscribe((authState) => {
      if (authState.accountsList) {
        this.accounts = authState.accountsList;
        this.accounts.map((value) => {
          const department = this.departments.find((dep) => {
            if (dep.value === value.department) {
              let str = dep.positions.find((pos) => {
                return pos.value === value.role;
              });
              if (str) value.role = str.text;
            }

            return dep.value === value.department;
          });
          if (department) value.department = department.text;

          return value;
        });
        this.spinner.hide();
      }
    });
  }

  // setRole() {
  //   this.http
  //     .patch(
  //       `https://us-central1-mon-prem.cloudfunctions.net/api/users/${this.users[0].uid}`,
  //       { email: this.users[0].email, role: "manager" }
  //     )
  //     .subscribe((res) => {
  //       console.log(res);
  //     });
  // }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
