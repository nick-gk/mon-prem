import { Action } from "@ngrx/store";

export const CHANGE_MENU = "[Header] Change Menu";

export class ChangeMenu implements Action {
  readonly type = CHANGE_MENU;
  constructor(public payload: { name: string }) {}
}

export type HeaderActions = ChangeMenu | null;
