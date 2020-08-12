import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router,
} from "@angular/router";
import { Observable, from, pipe } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import * as fromApp from "../../store/app.reducer";
import { Store } from "@ngrx/store";
import { take, map } from "rxjs/operators";
import * as headerActions from "../../header/store/header.actions";

@Injectable({
  providedIn: "root",
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private auth: AngularFireAuth
  ) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.auth.authState.pipe(
      take(1),
      map((user) => {
        this.store.dispatch(new headerActions.ChangeMenu({ name: "Setări" }));
        const isAuth = !!user;
        if (router.url === "/auth/login" && !isAuth) {
          return true;
        }
        if (isAuth) {
          if (router.url === "/auth/login") {
            return this.router.createUrlTree(["/orders/orders-list"]);
          }
          return true;
        }
        return this.router.createUrlTree(["/auth/login"]);
      })
    );
    //   return this.store.select("auth").pipe(
    //     take(1),
    // map(authState => {
    //   return authState.user;
    // }),
    // map(user => {
    //   const isAuth = !!user;
    //   if (router.url === "/auth" && !isAuth) {
    //     return true;
    //   }
    //   if (isAuth) {
    //     if (router.url === "/auth") {
    //       return this.router.createUrlTree(["/orders/add-order"]);
    //     }
    //     return true;
    //   }
    //   return this.router.createUrlTree(["/auth"]);
    // })
    //   );
    // }
  }
}
