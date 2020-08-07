import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { take, map } from "rxjs/operators";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  isAuthenticated: boolean = undefined;
  loaded: boolean = false;
  email: string;
  role: string;

  ngOnInit() {
    this.auth.auth.onAuthStateChanged((user) => {
      this.isAuthenticated = !!user;
      this.loaded = true;
      if (!this.isAuthenticated) this.router.navigate(["auth/login"]);

      this.auth.idTokenResult.subscribe((token) => {
        if (token) {
          this.email = token.claims.email;
          this.role = token.claims.role;
        }
      });
    });
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
    // this.auth.auth
    //   .signOut()
    //   .then(() => {
    //     console.log("Logged out");
    //     this.store.dispatch(new AuthActions.Logout());
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  }
}
