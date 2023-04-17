import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { PipeModule } from "../core/pipe/pipe.module";
import { ModalResultComponent } from './modal-result/modal-result.component';

@NgModule({
  declarations: [
    ModalResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PipeModule
  ],
  exports : [
    ModalResultComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class ComponentsModule { }
