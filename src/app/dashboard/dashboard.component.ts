import { Component, OnInit, OnDestroy } from "@angular/core";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { Subscription, Observable } from "rxjs";
import { Order } from "../orders/orders.model";
import * as OrdersActions from "../orders/store/orders.actions";
import { HttpClient } from "@angular/common/http";
import { map, take, tap } from "rxjs/operators";
import { AngularFireAuth } from "@angular/fire/auth";
import { User } from "../auth/User";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private http: HttpClient,
    private auth: AngularFireAuth
  ) {}
  orders: Order[];
  orderSub: Subscription;
  total: number = 0;
  expenses: number = 0;
  gross_margin: number = 0;
  gross_marginP: number = 0;
  nrOrders: number = 0;
  AvgRevenue: number = 0;
  AvgMargin: number = 0;
  AvgPeriod: number = 0;
  idToken: string = null;

  ngOnInit() {
    this.auth.idToken.subscribe((token) => {
      this.idToken = token;
    });
    // this.orderSub = this.store.select("orders").subscribe((orderState) => {
    //   this.orders = orderState.orders;
    //   if (!this.orders) this.store.dispatch(new OrdersActions.FetchOrders());
    //   this.orders.forEach((element) => {
    //     this.nrOrders++;
    //     this.total += element.summaryForm.total;
    //     element.elemsForm.forEach((el) => {
    //       if (el.expense) this.expenses += el.expense;
    //     });
    //     this.gross_margin = this.total - this.expenses;
    //     this.gross_marginP = (this.total - this.expenses) / this.total;
    //     this.AvgRevenue = this.total / this.nrOrders;
    //     this.AvgMargin = this.gross_margin / this.nrOrders;
    //     this.AvgPeriod = 45;
    //   });
    // });
  }

  users() {
    // this.users$.subscribe((users) => {
    //   console.log(users);
    // });
    // this.auth.auth.signOut();
    this.auth.idTokenResult
      .pipe(
        take(1),
        map((user) => {
          console.log(user);
          return user;
        })
      )
      .subscribe();
    // this.auth.idTokenResult.subscribe((token) => {
    //   console.log(token);
    // });
  }

  setAdmin() {
    this.setSetAdmin().subscribe((res) => {
      console.log(res);
    });
    //  this.setSetAdmin();
  }

  setSetAdmin() {
    return this.http.get(
      "https://us-central1-mon-prem.cloudfunctions.net/api/users/setAdmin"
    );
  }

  get users$(): Observable<User[]> {
    return this.http
      .get<{ users: User[] }>(
        "https://us-central1-mon-prem.cloudfunctions.net/api/users/"
      )
      .pipe(
        map((result) => {
          return result.users;
        })
      );
  }

  ngOnDestroy() {
    // this.orderSub.unsubscribe();
  }
}
