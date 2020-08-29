import { Action } from "@ngrx/store";
import { Profile } from "../Profile";
import { Account } from "../Account";

export const SIGNUP_START = "[Auth] Signup Start";
export const AUTHENTICATE_SUCCESS = "[Auth] Login";
export const AUTHENTICATE_FAIL = "[Auth] Fail";
export const LOGIN_START = "[Auth] Login Start";
export const LOGOUT = "[Auth] Logout";
export const CLEAR_ERROR = "[Auth] Clear Error";
export const AUTO_LOGIN = "[Auth] Auto Login";
export const USER_CREATE = "[Auth] Create User";
export const USER_EDIT = "[Auth] Edit User";
export const USER_SHOW = "[Auth] Show User";
export const LIST_USERS = "[Auth] List Users";
export const CREATION_SUCCESS = "[Auth] Creation Success";
export const PROFILE_CREATE = "[Auth] Profile Create";
export const PROFILE_UPDATE = "[Auth] Profile Update";
export const REQUEST_PROFILES = "[Auth] Request Profiles";
export const LOAD_PROFILES = "[Auth] Load Profiles";
export const REQUEST_PROFILE = "[Auth] Request Profile";
export const LOAD_PROFILE = "[Auth] Load Profile";
export const REQUEST_ACCOUNTS = "[Auth] Request Accounts";
export const LOAD_ACCOUNTS = "[Auth] Load Accounts";
export const REQUEST_ACCOUNT = "[Auth] Request Account";
export const LOAD_ACCOUNT = "[Auth] Load Account";
export const ACCOUNT_UPDATE = "[Auth] Account Update";

export class UserCreate implements Action {
  readonly type = USER_CREATE;

  constructor(
    public payload: {
      credentials: Account;
      profile: Profile;
    }
  ) {}
}

export class AccountUpdate implements Action {
  readonly type = ACCOUNT_UPDATE;
  constructor(public payload: Account) {}
}

export class ProfileUpdate implements Action {
  readonly type = PROFILE_UPDATE;
  constructor(public payload: { profile: Profile; uid: string }) {}
}

export class ProfileCreate implements Action {
  readonly type = PROFILE_CREATE;
  constructor(public payload: { uid: string; profile: Profile }) {}
}

export class CreationSuccess implements Action {
  readonly type = CREATION_SUCCESS;
}

export class UserShow implements Action {
  readonly type = USER_SHOW;
}

export class RequestAccounts implements Action {
  readonly type = REQUEST_ACCOUNTS;
}

export class LoadAccounts implements Action {
  readonly type = LOAD_ACCOUNTS;

  constructor(public payload: Account[]) {}
}

export class RequestAccount implements Action {
  readonly type = REQUEST_ACCOUNT;

  constructor(public payload: string) {}
}

export class LoadAccount implements Action {
  readonly type = LOAD_ACCOUNT;

  constructor(public payload: Account) {}
}

export class RequestProfiles implements Action {
  readonly type = REQUEST_PROFILES;
}

export class LoadProfiles implements Action {
  readonly type = LOAD_PROFILES;

  constructor(public payload: Profile[]) {}
}

export class RequestProfile implements Action {
  readonly type = REQUEST_PROFILE;

  constructor(public payload: string) {}
}

export class LoadProfile implements Action {
  readonly type = LOAD_PROFILE;

  constructor(public payload: Profile) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(
    public payload: {
      email: string;
      uid: string;
    }
  ) {}
}

export class SignupStart implements Action {
  readonly type = SIGNUP_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class LoginStart implements Action {
  readonly type = LOGIN_START;

  constructor(public payload: { email: string; password: string }) {}
}

export class ClearError implements Action {
  readonly type = CLEAR_ERROR;
}

export class AutoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class Logout implements Action {
  readonly type = LOGOUT;
}

export type AuthActions =
  | SignupStart
  | AuthenticateSuccess
  | LoginStart
  | AuthenticateFail
  | ClearError
  | Logout
  | AutoLogin
  | UserCreate
  | UserShow
  | CreationSuccess
  | RequestProfiles
  | LoadProfiles
  | ProfileCreate
  | RequestAccounts
  | LoadAccounts
  | RequestAccount
  | LoadAccount
  | RequestProfile
  | LoadProfile
  | AccountUpdate;
