import { Order } from "../orders.model";
import * as OrdersActions from "./orders.actions";

const initialState: State = {
  orders: [],
  orderError: ""
};

export interface State {
  orders: Order[];
  orderError: any;
}

export function orderReducer(
  state = initialState,
  action: OrdersActions.OrdersActions
) {
  switch (action.type) {
    case OrdersActions.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload]
      };
    case OrdersActions.SET_ORDERS:
      return {
        ...state,
        orders: [...action.payload]
      };
    case OrdersActions.ORDER_FAIL:
      console.log(1);
      return {
        ...state,
        orderError: action.payload
      };
  }
}
