import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalResultComponent } from 'src/app/components/modal-result/modal-result.component';
import { ICompany } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/service/company.service';
import { DiagnosticService } from 'src/app/core/service/diagnostic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  formCompany: FormGroup = new FormGroup({})
  formQuestions: FormGroup = new FormGroup({})
  questionsCompany: any[] = []
  activityOptions: string[] = []

  view: string = 'LIST'

  company: any[] = []

  constructor(
    private toastSrv: ToastrService,
    private companySrv: CompanyService,
    private diagnosticSrv: DiagnosticService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal
  ) {

    this.formCompany.addControl('name', new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    this.formCompany.addControl('cnpj', new FormControl(null, Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])))
  }

  ngOnInit(): void {

    this.getQuestions()
    this.getCompany()
  }

  getQuestions() {
    this.diagnosticSrv.getQuestions()
      .then((res) => {
        this.questionsCompany = res[0].items
        this.generateFormQuestions(this.questionsCompany)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  get name() { return this.formCompany.get('name')! };
  get cnpj() { return this.formCompany.get('cnpj')! };

  generateFormQuestions(data: any[]) {
    data.forEach((item) => {
      this.formQuestions.addControl(`question_${item._id}`, new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    })
  }

  getCompany() {
    this.companySrv.getCompany()
      .then((res: any) => {
        this.company = res
      })
  }

  cancelForm() {
    this.view = 'LIST'
    this.activityOptions = []
    this.formCompany.reset()
    this.formQuestions.reset()
  }

  createCompany() {
    if (this.formCompany.valid && this.formQuestions.valid) {

      const data: ICompany = {
        name: this.name.value,
        cnpj: this.cnpj.value,
        info: this.formQuestions.value
      }

      this.companySrv.createCompany(data)
        .subscribe({
          next: (res: any) => {
            this.toastSrv.success('Empresa cadastrada com sucesso!', 'PDAgro')
            this.getCompany()
            this.cancelForm()
          },
          error: (err) => {
            console.log(err)
            if (err.error && err.error.message) {
              this.toastSrv.error(err.error.message, 'PDAgro')
              return
            }
            this.toastSrv.error('Verifique sua conexão e tente novamente', 'PDAgro')
          }
        })
    } else {
      this.toastSrv.warning('Verifique os dados informados e tente novamente', 'PDAgro')
    }
  }

  onCheckChange(ev: any, item: any) {
    /* Selected */
    if (ev.target.checked) {
      this.activityOptions.push(ev.target.value)
    }
    /* unselected */
    else {
      let i = this.activityOptions.findIndex(a => a === ev.target.value)
      this.activityOptions.splice(i, 1)
    }
    this.formQuestions.get(`question_${item._id}`)?.setValue(JSON.stringify(this.activityOptions))
  }

  deleteCompany(id: any) {
    Swal.fire({
      title: 'Atenção',
      text: "Excluir empresa e diagnósticos relacionados?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
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



      }
    })
  }

  openDiagnostic(company: any, diagnostic: any) {
    const data = {
      name: company.name,
      cnpj: company.cnpj,
      diagnostic
    }
    const modalRef = this.modalService.open(ModalResultComponent, { size: 'xl', keyboard: false });
    modalRef.componentInstance.data = data
  }

}
