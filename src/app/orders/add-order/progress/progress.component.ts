import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  Injectable,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, FormArray } from "@angular/forms";

import { AngularFireStorage } from "@angular/fire/storage";
import { finalize, map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import * as fromApp from "../../../store/app.reducer";
@Injectable()
@Component({
  selector: "app-progress",
  templateUrl: "./progress.component.html",
  styleUrls: ["./progress.component.css"],
})
export class ProgressComponent implements OnInit {
  constructor(
    private form: FormBuilder,
    private storage: AngularFireStorage,
    private ref: ChangeDetectorRef,
    private store: Store<fromApp.AppState>
  ) {}

  @Input() id: number;

  @Input() orderForm: FormGroup;

  @ViewChild("piatra_poze", { static: false }) piatra_poze: ElementRef;
  @ViewChild("prelucrare_poze", { static: false })
  prelucrare_poze: ElementRef;
  @ViewChild("photoengraving_poze", { static: false })
  photoengraving_poze: ElementRef;
  @ViewChild("engraving_poze", { static: false }) engraving_poze: ElementRef;
  @ViewChild("mounting_poze", { static: false }) mounting_poze: ElementRef;

  @Output() progressFormEvent: EventEmitter<{
    group: FormGroup;
    name: string;
  }> = new EventEmitter();

  caractere: number;
  progressForm: FormGroup;

  ngOnInit() {
    this.progressForm = this.form.group({
      piatra: this.form.group({
        obsv: [""],
        poze: this.form.array([]),
      }),
      prelucrare: this.form.group({
        obsv: [""],
        poze: this.form.array([]),
      }),
      photoengraving: this.form.group({
        obsv: [""],
        poze: this.form.array([]),
      }),
      engraving: this.form.group({
        obsv: [""],
        poze: this.form.array([]),
      }),
      mounting: this.form.group({
        obsv: [""],
        poze: this.form.array([]),
      }),
    });

    this.store.select("orders").subscribe((orderState) => {
      if (orderState.orderEditIndex !== -1) {
        var order = orderState.orders[orderState.orderEditIndex].progressForm;
        Object.keys(order).forEach((el) => {
          if (order[el].poze) {
            order[el].poze.forEach((dl) => {
              (<FormArray>this.progressForm.get(el + ".poze")).push(
                this.form.group(dl)
              );
            });
          }
        });
      }
    });

    this.progressFormEvent.emit({
      group: this.progressForm,
      name: "progressForm",
    });

    this.checkSums();
  }

  onImageDelete(id: number, obj: string) {
    // let path: string = "";
    // path = (<FormArray>this.progressForm.get(obj + ".poze")).controls[id].get(
    //   "path"
    // ).value;
    // const ref = this.storage.ref(path);
    // ref.delete();
    (<FormArray>this.progressForm.get(obj + ".poze")).removeAt(id);
  }

  onAddImages(event) {
    let comp = event.srcElement.id;

    for (let i = 0; i < event.target.files.length; i++) {
      // let filePath: string =
      // "orders/" + this.id + "/" + event.target.files[i].name;
      let filePath: string = "temp/" + Date.now().toString();
      const ref = this.storage.ref(filePath);
      const task = ref.put(event.target.files[i]);

      task.percentageChanges().subscribe((el) => {
        console.log(el);
      });
      task
        .snapshotChanges()
        .pipe(
          finalize(() => {
            ref.getDownloadURL().subscribe((el) => {
              (<FormArray>(
                this.progressForm.get(
                  comp.slice(0, comp.indexOf("_")) + ".poze"
                )
              )).push(
                this.form.group({
                  path: filePath,
                  downloadUrl: el,
                })
              );
              this.ref.markForCheck();
            });
          })
        )
        .subscribe();
    }
  }

  addData() {
    let data: string = "";
    this.orderForm.get("deceasedForm").value.forEach((el) => {
      data += el.d_fname ? el.d_fname + "\n" : "";
      data += el.d_sname ? el.d_sname + "\n" : "";
      data += el.bdate ? el.bdate + "\n" : "";
      data += el.ddate ? el.ddate + "\n" : "";
    });
    this.progressForm.get("engraving").patchValue({
      obsv: data + this.progressForm.get("engraving.obsv").value,
    });
  }

  checkSums() {
    this.countChars(this.progressForm.get("engraving.obsv").value);
    this.progressForm.get("engraving.obsv").valueChanges.subscribe((el) => {
      this.countChars(el);
    });
  }

  countChars(el) {
    let str = el.replace(/[^a-zA-Z0-9]/g, "");
    this.caractere = str.length;
    this.ref.detectChanges();
  }
}
