import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromOrders from "../orders/store/orders.reducer";
import * as fromHeader from "../header/store/header.reducer";

export interface AppState {
  auth: fromAuth.State;
  orders: fromOrders.State;
  header: fromHeader.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  orders: fromOrders.orderReducer,
  header: fromHeader.headerReducer,
};
