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
  catchError
} from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
import { Order } from "../orders.model";
import { of } from "rxjs";

const handleError = (errorRes: any) => {
  return of(new OrdersActions.OrderFail(errorRes.error.error.message));
};

@Injectable()
export class OrdersEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<fromApp.AppState>
  ) {}
  @Effect() addOrder = this.actions$.pipe(
    ofType(OrdersActions.ADD_ORDER),
    withLatestFrom(this.store.select("orders")),
    switchMap(([actionData, ordersState]) => {
      console.log(ordersState.orders);
      return this.http
        .post("https://mon-prem.firebaseio.com/orders.json", ordersState.orders)
        .pipe(
          tap(resData => {
            console.log(resData);
          }),
          catchError(errorRes => {
            console.log("error");
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect() fetchOrders = this.actions$.pipe(
    ofType(OrdersActions.FETCH_ORDERS),
    switchMap(() => {
      return this.http.get<Order[]>(
        "https://mon-prem.firebaseio.com/orders.json"
      );
    }),
    map(orders => {
      console.log(orders);
      return new OrdersActions.SetOrders(orders);
    })
  );
}
