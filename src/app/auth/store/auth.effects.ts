import * as AuthActions from "./auth.actions";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import {
  switchMap,
  tap,
  catchError,
  map,
  take,
  exhaustMap,
} from "rxjs/operators";
import { User } from "../User";
import { of, from } from "rxjs";
import { AuthService } from "../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuthentication = (resData) => {
  // const expirationDate = new Date(
  //   new Date().getTime() + +resData.expiresIn * 1000
  // );
  console.log(resData);

  // const user = new User(
  //   resData.email,
  //   resData.localId,
  //   resData.idToken,
  //   expirationDate
  // );

  // console.log(user);
  //localStorage.setItem("userData", JSON.stringify(user));
  return new AuthActions.AuthenticateSuccess({
    email: resData.email,
    uid: resData.uid,
  });
};

const handleError = (errorRes: any) => {
  let errorMessage = errorRes.message;
  // if (!errorRes.error || !errorRes.error.error) {
  //   return of(new AuthActions.AuthenticateFail(errorMessage));
  // }
  // switch (errorRes.code) {
  //   case "EMAIL_EXISTS":
  //     errorMessage = "This email exists already";
  //     break;
  //   case "EMAIL_NOT_FOUND":
  //     errorMessage = "This email was not found";
  //     break;
  //   case "auth/wrong-password":
  //     errorMessage = "This password is not correct";
  //     break;
  //   case "auth/too-many-requests"
  // }
  return of(new AuthActions.AuthenticateFail(errorMessage));
};

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
    private auth: AngularFireAuth,
    private store: Store<fromApp.AppState>
  ) {}

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.SIGNUP_START),
    switchMap((signupAction: AuthActions.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCuEvQyyg9_qTLntcppoP8Wk5ba17uEiw8",
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuthentication(resData);
          }),
          catchError((errorRes) => {
            return handleError(errorRes);
          })
        );
    })
  );

  @Effect({ resubscribeOnError: true })
  authLogin = this.actions$.pipe(
    ofType(AuthActions.LOGIN_START),
    map((authData: AuthActions.LoginStart) => {
      return {
        email: authData.payload.email,
        password: authData.payload.password,
      };
    }),
    exhaustMap((user) => {
      return this.auth.auth
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          return this.auth.auth.signInWithEmailAndPassword(
            user.email,
            user.password
          );
        });
    }),
    switchMap(() => {
      return this.auth.idTokenResult.pipe(
        take(1),
        map((token) => {
          return new AuthActions.AuthenticateSuccess({
            email: token.claims.email,
            uid: token.claims.uid,
          });
        })
      );
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  //   // console.log("logging in...");
  //   // return from(this.auth.auth
  //   //   .setPersistence(firebase.auth.Auth.Persistence.SESSION)
  //   //   .then(() => {
  //   //     this.auth.auth
  //   //       .signInWithEmailAndPassword(
  //   //         authData.payload.email,
  //   //         authData.payload.password
  //   //       )})).pipe((user) => {
  //   //         this.auth.idTokenResult.pipe(take(1)).subscribe((token) => {
  //   //           console.log(token);
  //   //           return new AuthActions.AuthenticateSuccess({
  //   //             email: token.claims.email,
  //   //             uid: token.claims.sub,
  //   //           });
  //   //           // return handleAuthentication(token);
  //   //         });
  //   //       })
  //   //       .catch((errorRes) => {
  //   //         return handleError(errorRes);
  //   //       });
  //   //   });
  // })

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.AUTHENTICATE_SUCCESS),
    tap((authSuccessActions: AuthActions.AuthenticateSuccess) => {
      // if (authSuccessActions.payload.redirect)
      this.router.navigate(["/orders/orders-list"]);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    map(() => {
      this.router.navigate(["/auth"]);
      this.auth.auth.signOut().then(() => {
        console.log("Logged out");
      });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  // @Effect()
  // autoLogin = this.actions$.pipe(
  //   ofType(AuthActions.AUTO_LOGIN),
  //   map(() => {
  //     const userData: {
  //       email: string;
  //       id: string;
  //       _token: string;
  //       _tokenExpirationDate: string;
  //     } = JSON.parse(localStorage.getItem("userData"));

  //     if (!userData) {
  //       return { type: "!userData" };
  //     }

  //     const loadedUser = new User(
  //       userData.email,
  //       userData.id,
  //       userData._token,
  //       new Date(userData._tokenExpirationDate)
  //     );

  //     if (loadedUser.token) {
  //       const expirationD =
  //         new Date(userData._tokenExpirationDate).getTime() -
  //         new Date().getTime();
  //       this.authService.setLogoutTimer(expirationD);
  //       return new AuthActions.AuthenticateSuccess({
  //         email: loadedUser.email,
  //         id: loadedUser.id,
  //         token: loadedUser.token,
  //         expirationDate: new Date(userData._tokenExpirationDate),
  //         redirect: false,
  //       });
  //     }
  //     return { type: "!token" };
  //   })
  // );
}
