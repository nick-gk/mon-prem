import { ActionReducerMap } from "@ngrx/store";
import * as fromAuth from "../auth/store/auth.reducer";
import * as fromOrders from "../orders/store/orders.reducer";

export interface AppState {
  auth: fromAuth.State;
  orders: fromOrders.State;
}

export const appReducer: ActionReducerMap<AppState> = {
  auth: fromAuth.authReducer,
  orders: fromOrders.orderReducer
};
