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
  concatMap,
} from "rxjs/operators";
import { User } from "../User";
import { of, from, Observable } from "rxjs";
import { AuthService } from "../auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { Store } from "@ngrx/store";
import * as fromApp from "../../store/app.reducer";
import { Account } from "../Account";
import { AngularFireDatabase } from "@angular/fire/database";
import { Profile } from "../Profile";

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
    private store: Store<fromApp.AppState>,
    private db: AngularFireDatabase
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

  @Effect()
  userCreation = this.actions$.pipe(
    ofType(AuthActions.USER_CREATE),
    map((data: AuthActions.UserCreate) => {
      return data.payload;
    }),
    exhaustMap((creds) => {
      return this.http
        .post<{ uid: string }>(
          "https://us-central1-mon-prem.cloudfunctions.net/api/users",
          creds.credentials
        )
        .pipe(
          map((res) => {
            this.store.dispatch(new AuthActions.CreationSuccess());
            return new AuthActions.ProfileCreate({
              uid: res.uid,
              profile: creds.profile,
            });
          })
        );
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  @Effect()
  profileUpdate = this.actions$.pipe(
    ofType(AuthActions.PROFILE_UPDATE),
    exhaustMap((data: AuthActions.ProfileUpdate) => {
      return this.db
        .object(`users/${data.payload.uid}`)
        .valueChanges()
        .pipe(
          take(1),
          exhaustMap((profile) => {
            if (profile) {
              const users = this.db.database.ref("users");
              return users
                .child(data.payload.uid)
                .update(data.payload.profile)
                .then(() => {
                  return new AuthActions.CreationSuccess();
                });
            } else {
              return of(
                new AuthActions.ProfileCreate({
                  uid: data.payload.uid,
                  profile: data.payload.profile,
                })
              );
            }
          })
        );
    }),
    catchError((error, caught) => {
      console.log(error.message);
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  @Effect({ dispatch: false })
  accountUpdate = this.actions$.pipe(
    ofType(AuthActions.ACCOUNT_UPDATE),
    map((data: AuthActions.AccountUpdate) => {
      return data.payload;
    }),
    exhaustMap((account) => {
      return this.http.patch<{ user: Account }>(
        `https://us-central1-mon-prem.cloudfunctions.net/api/users/${account.uid}`,
        account
      );
    }),
    map((res) => {
      console.log(res);
    }),
    catchError((error, caught) => {
      console.log(error.message);
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  @Effect()
  profileCreate = this.actions$.pipe(
    ofType(AuthActions.PROFILE_CREATE),
    map((data: AuthActions.ProfileCreate) => {
      return { profile: data.payload.profile, uid: data.payload.uid };
    }),
    exhaustMap((data) => {
      const users = this.db.database.ref("users");
      return users
        .child(data.uid)
        .set(data.profile)
        .then((res) => {
          return new AuthActions.CreationSuccess();
        });
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
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

  @Effect()
  loadProfiles = this.actions$.pipe(
    ofType(AuthActions.REQUEST_PROFILES),
    switchMap(() => {
      return this.db.object(`users`).valueChanges();
    }),
    map((profiles) => {
      console.log(profiles);
      return new AuthActions.LoadProfiles(profiles as Profile[]);
    })
  );

  @Effect()
  loadProfile = this.actions$.pipe(
    ofType(AuthActions.REQUEST_PROFILE),
    switchMap((data: AuthActions.RequestProfile) => {
      return this.db.object(`users/${data.payload}`).valueChanges();
    }),
    map((profile) => {
      return new AuthActions.LoadProfile(profile as Profile);
    }),
    catchError((error, caught) => {
      this.store.dispatch(new AuthActions.AuthenticateFail(error.message));
      return caught;
    })
  );

  @Effect()
  loadAccounts = this.actions$.pipe(
    ofType(AuthActions.REQUEST_ACCOUNTS),
    switchMap(() => {
      return this.http.get<{ users: Account[] }>(
        "https://us-central1-mon-prem.cloudfunctions.net/api/users/"
      );
    }),
    map((accounts) => {
      console.log(accounts);
      return new AuthActions.LoadAccounts(accounts.users as Account[]);
    })
  );

  @Effect()
  loadAccount = this.actions$.pipe(
    ofType(AuthActions.REQUEST_ACCOUNT),
    switchMap((data: AuthActions.RequestAccount) => {
      return this.http.get<{ user: Account }>(
        `https://us-central1-mon-prem.cloudfunctions.net/api/users/${data.payload}`
      );
    }),
    map((account) => {
      console.log(account);
      return new AuthActions.LoadAccount(account.user as Account);
    })
  );

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
