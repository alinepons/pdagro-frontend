import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { DiagnosticService } from 'src/app/core/service/diagnostic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-feedback',
  templateUrl: './modal-feedback.component.html',
  styleUrls: ['./modal-feedback.component.scss']
})
export class ModalFeedbackComponent implements OnInit {

  @Input() data: any

  constructor(
    public activeModal: NgbActiveModal,
    private diagnosticSrv: DiagnosticService,
    private toastSrv: ToastrService,
    public authSrv: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  objToArray(data: any) {
    let items: any[] = []
    Object.keys(data).forEach((k) => {
      items.push(data[k])
    })
    return items
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

  deleteFeedback(id: string) {

    Swal.fire({
      title: 'Atenção',
      text: "Deseja excluir a avaliação selecionada? Essa ação não poderá ser desfeita!",
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
        // this.diagnosticSrv.deleteDiagnostic(id)
        //   .then((res) => {
        //     this.closeModal('delete')
        //     this.toastSrv.success('Avaliação excluída com sucesso!', 'PDAgro')
        //   })
        //   .catch((err) => {
        //     console.log(err)
        //     this.toastSrv.warning('Verifique sua conexão e tente novamente!', 'PDAgro')
        //   })

      }
    })
  }

  closeModal(action: string | null) {
    this.activeModal.dismiss(action)
  }

}
