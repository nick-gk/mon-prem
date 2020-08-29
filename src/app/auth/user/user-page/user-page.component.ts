import { Component, OnInit, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import * as fromApp from "../../../store/app.reducer";
import * as AuthActions from "../../store/auth.actions";
import { Store } from "@ngrx/store";
import { take, tap } from "rxjs/operators";
import { Profile } from "../../Profile";
import { Account } from "../../Account";
import { Subscription } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-user-page",
  templateUrl: "./user-page.component.html",
  styleUrls: ["./user-page.component.css"],
})
export class UserPageComponent implements OnInit, OnDestroy {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private spinner: NgxSpinnerService
  ) {}

  uid: string = null;
  profile: Profile = null;
  account: Account = null;
  sub: Subscription;

  ngOnInit() {
    this.spinner.show();
    setTimeout(() => {
      this.spinner.hide();
    }, 1000);
    this.route.params.subscribe((params) => {
      this.uid = params.id;
    });
    this.store.dispatch(new AuthActions.RequestProfile(this.uid));
    this.store.dispatch(new AuthActions.RequestAccount(this.uid));

    this.sub = this.store.select("auth").subscribe((authState) => {
      if (authState.profile) this.profile = authState.profile;
      if (authState.account) this.account = authState.account;
    });
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onEditAccount() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParams: { edit: "account" },
    });
  }

  onEditProfile() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParams: { edit: "profile" },
    });
  }

  onChangePassword() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParams: { edit: "changePassword" },
    });
  }
}
