import * as headerActions from "./header.actions";

export interface State {
  name: string;
}

const initialState: State = {
  name: "Menu Principal",
};

export function headerReducer(
  state = initialState,
  action: headerActions.HeaderActions
) {
  switch (action.type) {
    case headerActions.CHANGE_MENU: {
      return {
        ...state,
        name: action.payload.name,
      };
    }
    default:
      return state;
  }
}
