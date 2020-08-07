import * as fromApp from "../../store/app.reducer";
import {
  CanActivate,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from "@angular/router";
import { Store } from "@ngrx/store";
import { take, map, switchMap } from "rxjs/operators";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: "root" })
export class AuthRoleGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private auth: AngularFireAuth
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
    return this.auth.idTokenResult.pipe(
      take(1),
      map((user) => {
        const isAuth = !!user;
        if (
          isAuth &&
          (route.data.roles as Array<string>).includes(user.claims.role)
        ) {
          return true;
        }
        alert("Insuficient Privileges");
        return false;
      })
    );
  }
}
