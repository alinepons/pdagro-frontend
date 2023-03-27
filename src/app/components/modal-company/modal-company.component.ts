import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/service/auth.service';
import { CompanyService } from 'src/app/core/service/company.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-company',
  templateUrl: './modal-company.component.html',
  styleUrls: ['./modal-company.component.scss']
})
export class ModalCompanyComponent implements OnInit {

  @Input() data: any
  imagePath: string = ""

  constructor(
    public activeModal: NgbActiveModal,
    private toastSrv: ToastrService,
    private companySrv: CompanyService,
    public authSrv: AuthService
  ) { }

  ngOnInit(): void {
    console.log(this.data)
  }

  toArray(data: any) {
    return JSON.parse(data)
  }

  deleteCompany(id: string) {
    Swal.fire({
      title: 'Atenção',
      text: "Deseja excluir a empresa selecionada? Essa ação não poderá ser desfeita!",
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
        this.companySrv.deleteCompany(id)
          .then((res) => {
            this.closeModal('delete')
            this.toastSrv.success('Empresa excluída com sucesso!', 'PDAgro')
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
