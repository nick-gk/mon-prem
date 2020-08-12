import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store } from "@ngrx/store";
import * as fromApp from "../store/app.reducer";
import * as AuthActions from "../auth/store/auth.actions";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { take, map } from "rxjs/operators";
import * as headerActions from "./store/header.actions";
import { Subscription } from "rxjs";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit, OnDestroy {
  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private auth: AngularFireAuth
  ) {}

  isAuthenticated: boolean = undefined;
  loaded: boolean = false;
  email: string;
  role: string;
  selectedMenu: string = "main";
  menu = null;
  menuSub: Subscription;

  fullMenu = [
    {
      name: "Menu Principal",
      items: [
        { name: "Dashboard", routerLink: "/dashboard" },
        { name: "Comenzi", routerLink: "/orders/orders-list" },
        { name: "Adaugă Comandă", routerLink: "/orders/add-order" },
      ],
    },
    {
      name: "Setări",
      items: [
        { name: "Lista Userilor", routerLink: "/auth/users-list" },
        { name: "Profil", routerLink: "/auth/profile" },
      ],
    },
  ];

  ngOnInit() {
    this.menuSub = this.store.select("header").subscribe((headerState) => {
      this.menu = this.fullMenu.find((id) => id.name === headerState.name);
    });

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

  ngOnDestroy() {
    this.menuSub.unsubscribe();
  }

  onLogout() {
    this.store.dispatch(new AuthActions.Logout());
  }
}
