import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { NgxSpinnerModule, NgxSpinnerService } from "ngx-spinner";

@NgModule({
  declarations: [],
  imports: [CommonModule, NgxSpinnerModule],
  exports: [NgxSpinnerModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [NgxSpinnerService],
})
export class SharedModule {}
