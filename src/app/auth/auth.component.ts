import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  authType = '';
  isLoading = false;
  error: string = null;

  private storeSub: Subscription;

  onEmployee() {
    this.authType = 'employee';
  }
  onCustomer() {
    this.authType = 'customer';
  }
  onBack() {
    this.authType = '';
  }

  onSubmit(form: NgForm) {
    console.log(form.valid);
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading = true;
    if (this.authType === 'employee')
      this.store.dispatch(new AuthActions.LoginStart({ email, password }));

    form.reset();
  }

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe(authState => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        console.log(this.error);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
