import * as fromApp from "../store/app.reducer";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree
} from "@angular/router";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private store: Store<fromApp.AppState>) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.store.select("auth").pipe(
      take(1),
      map(authState => {
        return authState.user;
      }),
      map(user => {
        const isAuth = !!user;
        if (router.url === "/auth" && !isAuth) {
          return true;
        }
        if (isAuth) {
          if (router.url === "/auth") {
            return this.router.createUrlTree(["/orders/add-order"]);
          }
          return true;
        }
        return this.router.createUrlTree(["/auth"]);
      })
    );
  }
}
