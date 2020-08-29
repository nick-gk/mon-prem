import { User } from "../User";
import * as AuthActions from "./auth.actions";
import { Profile } from "../Profile";
import { Account } from "../Account";

export interface State {
  profilesList: Profile[];
  accountsList: Account[];
  user: User;
  authError: string;
  loading: boolean;
  profile: Profile;
  account: Account;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false,
  profile: null,
  profilesList: null,
  accountsList: null,
  account: null,
};

export function authReducer(
  state = initialState,
  action: AuthActions.AuthActions
) {
  switch (action.type) {
    case AuthActions.LOGIN_START:
    case AuthActions.SIGNUP_START:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(action.payload.email, action.payload.uid);
      return {
        ...state,
        user: user,
        authError: null,
        loading: false,
      };
    case AuthActions.USER_CREATE:
      return {
        ...state,
        authError: null,
        loading: true,
        profile: action.payload.profile,
      };
    case AuthActions.LOAD_PROFILES:
      return {
        ...state,
        profilesList: action.payload,
      };
    case AuthActions.LOAD_PROFILE:
      return {
        ...state,
        profile: action.payload,
      };
    case AuthActions.LOAD_ACCOUNT:
      return {
        ...state,
        account: action.payload,
      };
    case AuthActions.LOAD_ACCOUNTS:
      return {
        ...state,
        accountsList: action.payload,
      };
    case AuthActions.CREATION_SUCCESS:
      return {
        ...state,
        authError: "success",
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        user: null,
      };

    default:
      return state;
  }
}
