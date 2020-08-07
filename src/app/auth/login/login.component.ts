import { Component, OnInit, OnDestroy, Injectable } from "@angular/core";
import { NgForm } from "@angular/forms";
import * as fromApp from "../../store/app.reducer";
import * as AuthActions from "../store/auth.actions";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import {
  Router,
  ActivatedRouteSnapshot,
  ActivatedRoute,
} from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit, OnDestroy {
  authType = "";
  isLoading = false;
  error: string = null;
  private storeSub: Subscription;

  onEmployee() {
    this.authType = "employee";
  }
  onCustomer() {
    this.authType = "customer";
  }
  onBack() {
    this.authType = "";
    this.error = null;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;

    if (this.authType === "employee") {
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));
    }

    form.reset();
  }

  onSignUp(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.store.dispatch(new AuthActions.SignupStart({ email, password }));
  }

  constructor(
    private store: Store<fromApp.AppState>,
    public auth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select("auth").subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
