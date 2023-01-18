import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbActiveModal } from "@ng-bootstrap/ng-bootstrap";
import { ModalResultComponent } from './modal-result/modal-result.component';

@NgModule({
  declarations: [
    ModalResultComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports : [
    ModalResultComponent
  ],
  providers: [
    NgbActiveModal
  ]
})
export class ComponentsModule { }
