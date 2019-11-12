import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  authType = '';

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
    if (!form.valid) return;
    const email = form.value.email;
    const password = form.value.password;
    console.log(password);
    this.store.dispatch(new AuthActions.SignupStart({ email, password }));

    form.reset();
  }

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {}
}
