import { Action } from "@ngrx/store";
import { Order } from "../orders.model";

export const ADD_ORDER = "[Orders] Add Order";
export const FETCH_ORDERS = "[Orders] Fetch Orders";
export const SET_ORDERS = "[Orders] Set Orders";
export const ORDER_FAIL = "[Orders] Fail";
export const STORE_ORDERS = "[Orders] Store Orders";
export const START_EDIT = "[Orders] Start Edit";
export const STOP_EDIT = "[Orders] Stop Edit";
export const UPDATE_ORDER = "[Orders] Update Order";

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

export class StartEdit implements Action {
  readonly type = START_EDIT;

  constructor(public payload: number) {}
}

export class StopEdit implements Action {
  readonly type = STOP_EDIT;
}

export class UpdateOrder implements Action {
  readonly type = UPDATE_ORDER;

  constructor(public payload: Order) {}
}

export type OrdersActions =
  | AddOrder
  | FetchOrders
  | SetOrders
  | OrderFail
  | StoreOrders
  | StartEdit
  | StopEdit
  | UpdateOrder;
