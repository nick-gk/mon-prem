import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import * as OrdersActions from "./orders.actions";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import {
  withLatestFrom,
  switchMap,
  map,
  tap,
  catchError,
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Order } from "../orders.model";
import { of } from "rxjs";
import { AngularFireDatabase } from "@angular/fire/database";
import { Observable } from "rxjs";

const handleError = (errorRes: any) => {
  return of(new OrdersActions.OrderFail(errorRes.error.error.message));
};

@Injectable()
export class OrdersEffects {
  items: Observable<Order[]>;
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>,
    private db: AngularFireDatabase
  ) {}

  @Effect({ dispatch: false })
  storeOrders = this.actions$.pipe(
    ofType(OrdersActions.STORE_ORDERS),
    withLatestFrom(this.store.select("orders")),
    switchMap(([actionData, ordersState]) => {
      return this.db.list("/").set("orders", ordersState.orders);
    })
  );

  @Effect() fetchOrders = this.actions$.pipe(
    ofType(OrdersActions.FETCH_ORDERS),
    switchMap(() => {
      return this.db.list("orders").valueChanges();
    }),
    map((orders) => {
      console.log(orders);
      return new OrdersActions.SetOrders(orders as Order[]);
    })
  );
}
