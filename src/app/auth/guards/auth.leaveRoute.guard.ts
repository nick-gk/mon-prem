import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Injectable } from "@angular/core";
import * as HeaderActions from "../../header/store/header.actions";

interface CanDeactivate {
  canDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree;
}

@Injectable({ providedIn: "root" })
export class leaveRouteGuard implements CanDeactivate {
  constructor(private store: Store<fromApp.AppState>) {}

  canDeactivate(
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot
  ) {
    this.store.dispatch(
      new HeaderActions.ChangeMenu({ name: "Menu Principal" })
    );
    return true;
  }
}
