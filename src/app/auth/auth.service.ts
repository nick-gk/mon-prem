import * as fromApp from '../store/app.reducer';
import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import * as AuthActions from './store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpTimer: any;

  constructor(private store: Store<fromApp.AppState>) {}

  setLogoutTimer(expirationD: number) {
    this.tokenExpTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.Logout());
      console.log(expirationD);
    }, expirationD);
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
