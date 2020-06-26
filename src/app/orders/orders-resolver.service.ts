import {
  Resolve,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";
import { Order } from "./orders.model";
import { Observable, Subscription, of } from "rxjs";
import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import * as OrdersActions from "./store/orders.actions";
import { Injectable } from "@angular/core";
import { take, map, switchMap } from "rxjs/operators";
import { Actions, ofType } from "@ngrx/effects";

@Injectable()
export class OrdersResolver implements Resolve<Order[]> {
  constructor(
    private store: Store<fromApp.AppState>,
    private actions$: Actions
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select("orders").pipe(
      take(1),
      map((ordersState) => {
        return ordersState.orders;
      }),
      switchMap((orders) => {
        if (orders.length === 0) {
          this.store.dispatch(new OrdersActions.FetchOrders());
          return this.actions$.pipe(ofType(OrdersActions.SET_ORDERS), take(1));
        } else {
          return of(orders);
        }
      })
    );
  }
}
