import { Order } from "../orders.model";
import * as OrdersActions from "./orders.actions";

const initialState: State = {
  orders: [],
  orderError: "",
  orderEdit: null,
  orderEditIndex: -1,
};

export interface State {
  orders: Order[];
  orderError: any;
  orderEdit: Order;
  orderEditIndex: number;
}

export function orderReducer(
  state = initialState,
  action: OrdersActions.OrdersActions
) {
  switch (action.type) {
    case OrdersActions.ADD_ORDER:
      return {
        ...state,
        orders: [...state.orders, action.payload],
      };
    case OrdersActions.SET_ORDERS:
      return {
        ...state,
        orders: [...action.payload],
      };
    case OrdersActions.ORDER_FAIL:
      console.log(1);
      return {
        ...state,
        orderError: action.payload,
      };
    case OrdersActions.UPDATE_ORDER:
      const order: Order = state.orders[state.orderEditIndex];
      const updatedOrder = { ...order, ...action.payload };
      const updatedOrders = { ...state.orders };
      updatedOrders[state.orderEditIndex] = updatedOrder;
      return {
        ...state,
        orders: updatedOrders,
        orderEditIndex: -1,
        orderEdit: null,
      };
    case OrdersActions.START_EDIT:
      return {
        ...state,
        orderEditIndex: action.payload,
        orderEdit: { ...state.orders[action.payload] },
      };
    case OrdersActions.STOP_EDIT:
      return {
        ...state,
        orderEditIndex: -1,
        orderEdit: null,
      };

    default:
      return state;
  }
}
