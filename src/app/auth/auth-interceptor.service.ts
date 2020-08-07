import * as fromApp from "../store/app.reducer";
import { Store } from "@ngrx/store";
import { HttpRequest, HttpHandler, HttpParams } from "@angular/common/http";
import { exhaustMap, map, take, switchMap } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";

@Injectable({ providedIn: "root" })
export class AuthInterceptorService {
  constructor(
    private store: Store<fromApp.AppState>,
    private auth: AngularFireAuth
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    // return this.store.select('auth').pipe(
    //   take(1),
    //   map(authState => {
    //     return authState.user;
    //   }),
    //   exhaustMap(user => {
    //     if (!user) {
    //       return next.handle(req);
    //     }
    //     const modifiedReq = req.clone({
    //       params: new HttpParams().set('auth', user.token)
    //     });
    //     return next.handle(modifiedReq);
    //   })
    // );
    return this.auth.idToken.pipe(
      take(1),
      switchMap((idToken) => {
        let clone = req.clone();
        if (idToken) {
          clone = clone.clone({
            headers: req.headers.set("Authorization", "Bearer " + idToken),
          });
        }
        return next.handle(clone);
      })
    );
  }
}
