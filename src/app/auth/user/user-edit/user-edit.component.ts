import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormGroup, FormBuilder, FormControl } from "@angular/forms";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
import * as AuthActions from "../../store/auth.actions";
import { Account } from "../../Account";
import * as Departments from "./Departments";
import { AngularFireStorage } from "@angular/fire/storage";
import { finalize } from "rxjs/operators";

@Component({
  selector: "app-user-edit",
  templateUrl: "./user-edit.component.html",
  styleUrls: ["./user-edit.component.css"],
})
export class UserEditComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromApp.AppState>,
    private storage: AngularFireStorage,
    private ref: ChangeDetectorRef
  ) {}

  userForm: FormGroup;
  editMode: string = "create";
  uid: string = null;
  account: Account = null;
  departments = Departments.Departments;
  selectedDepartment = null;

  ngOnInit() {
    this.userForm = this.form.group({
      accountDetails: this.form.group({
        email: [""],
        password: [""],
        department: [""],
        privileges: [""],
        role: [""],
        active: ["active"],
      }),
      profileDetails: this.form.group({
        fullName: [""],
        city: [""],
        phoneNumber: [""],
        salaryBrut: [""],
        salaryNet: [""],
        personalEmail: [""],
        genre: [""],
        birthDate: [""],
        cnp: [""],
        employmentDate: [""],
        manager: [""],
        picture: [""],
      }),
    });

    this.route.params.subscribe((params) => {
      if (params.id) {
        this.uid = params.id;

        this.route.queryParams.subscribe((queryParams) => {
          if (queryParams) {
            this.editMode = queryParams.edit;
            if (this.editMode === "account") {
              this.store.dispatch(new AuthActions.RequestAccount(this.uid));
              this.store.select("auth").subscribe((authState) => {
                if (authState.account) {
                  this.account = authState.account;
                  this.userForm
                    .get("accountDetails")
                    .patchValue(authState.account);
                }
              });
            }

            if (this.editMode === "profile") {
              this.store.dispatch(new AuthActions.RequestProfile(this.uid));
              this.store.select("auth").subscribe((authState) => {
                if (authState.profile) {
                  this.userForm
                    .get("profileDetails")
                    .patchValue(authState.profile);
                }
              });
            }
          }
        });
      }
    });

    this.checkPosition();
  }

  checkPosition() {
    (this.userForm.get(
      "accountDetails.department"
    ) as FormControl).valueChanges.subscribe((value) => {
      this.selectedDepartment = this.departments.find((dep) => {
        return dep.value === value;
      });
    });
  }

  onSubmit() {
    console.log(this.userForm);

    switch (this.editMode) {
      case "account":
        console.log(this.userForm.value.accountDetails);
        this.store.dispatch(
          new AuthActions.AccountUpdate({
            ...this.account,
            ...this.userForm.value.accountDetails,
          })
        );
        break;
      case "profile":
        console.log(this.userForm.value.profileDetails);
        this.store.dispatch(
          new AuthActions.ProfileUpdate({
            uid: this.uid,
            profile: this.userForm.value.profileDetails,
          })
        );
        break;
      case "create":
        console.log(this.userForm.value);
        this.store.dispatch(
          new AuthActions.UserCreate({
            credentials: this.userForm.value.accountDetails,
            profile: this.userForm.value.profileDetails,
          })
        );
      default:
        break;
    }

    //loading navigate after loaded

    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route });
  }

  onAddImage(event) {
    let comp = event.srcElement.id;

    // let filePath: string =
    // "orders/" + this.id + "/" + event.target.files[i].name;
    let filePath: string = "temp/" + Date.now().toString();
    const ref = this.storage.ref(filePath);
    const task = ref.put(event.target.files[0]);

    task.percentageChanges().subscribe((el) => {
      console.log(el);
    });
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          ref.getDownloadURL().subscribe((el) => {
            (this.userForm.get(
              "profileDetails.picture"
            ) as FormControl).patchValue(el);
            this.ref.markForCheck();
            console.log(this.userForm);
          });
        })
      )
      .subscribe();
  }
}
