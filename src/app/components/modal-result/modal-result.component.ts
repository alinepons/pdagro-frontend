import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { DiagnosticService } from 'src/app/core/service/diagnostic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-result',
  templateUrl: './modal-result.component.html',
  styleUrls: ['./modal-result.component.scss']
})
export class ModalResultComponent implements OnInit {

  @Input() data: any

  pdfMake: any;
  imagePath: string = ""

  constructor(public activeModal: NgbActiveModal, private diagnosticSrv: DiagnosticService, private toastSrv: ToastrService, private router: Router) { }

  ngOnInit(): void {

  }

  getCertificate() {
    this.diagnosticSrv.getCertificate(this.data)
      .then((res: any) => {
        const fileURL = URL.createObjectURL(res);
        window.open(fileURL);
      })
      .catch((err: any) => {
        this.toastSrv.error('Erro ao gerar PDF', 'PDAgro')
      })
  }

  deleteDiagnostic(id: string) {

    Swal.fire({
      title: 'Atenção',
      text: "Deseja excluir o diagnóstico selecionado? Essa ação não poderá ser desfeita!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir!',
      cancelButtonText: 'Cancelar',
      focusCancel: true,
      showClass: {
        popup: 'animate__animated animate__fadeInDown animate__faster'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp animate__faster'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.diagnosticSrv.deleteDiagnostic(id)
          .then((res) => {
            this.closeModal('delete')
            this.toastSrv.success('Diagnóstico excluído com sucesso!', 'PDAgro')
          })
          .catch((err) => {
            console.log(err)
            this.toastSrv.warning('Verifique sua conexão e tente novamente!', 'PDAgro')
          })

      }
    })
  }

  closeModal(action: string | null) {
    this.activeModal.dismiss(action)
  }

}
