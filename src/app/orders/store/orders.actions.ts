import { Action } from "@ngrx/store";
import { Order } from "../orders.model";

export const ADD_ORDER = "[Orders] Add Order";
export const FETCH_ORDERS = "[Orders] Fetch Orders";
export const SET_ORDERS = "[Orders] Set Orders";
export const ORDER_FAIL = "[Orders] Fail";
export const STORE_ORDERS = "[Orders] Store Orders";

export class AddOrder implements Action {
  readonly type = ADD_ORDER;

  constructor(public payload: Order) {}
}

export class FetchOrders implements Action {
  readonly type = FETCH_ORDERS;
}

export class SetOrders implements Action {
  readonly type = SET_ORDERS;

  constructor(public payload: Order[]) {}
}

export class StoreOrders implements Action {
  readonly type = STORE_ORDERS;
}

export class OrderFail implements Action {
  readonly type = ORDER_FAIL;

  constructor(public payload: string) {}
}

export type OrdersActions =
  | AddOrder
  | FetchOrders
  | SetOrders
  | OrderFail
  | StoreOrders;
