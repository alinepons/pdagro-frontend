import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ICompanyResponse } from 'src/app/core/models/company';
import { IDiagnostic } from 'src/app/core/models/diagnostic';
import { CompanyService } from 'src/app/core/service/company.service';
import { DiagnosticService } from 'src/app/core/service/diagnostic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-diagnostic',
  templateUrl: './diagnostic.component.html',
  styleUrls: ['./diagnostic.component.scss']
})
export class DiagnosticComponent implements OnInit {

  company: ICompanyResponse | null = null
  questionsProccessList: any[] = []
  questionsLawList: any[] = []
  questionsTechList: any[] = []
  questionsLearningList: any[] = []

  formProccess: FormGroup = new FormGroup({});
  formLaw: FormGroup = new FormGroup({});
  formTech: FormGroup = new FormGroup({});
  formLearning: FormGroup = new FormGroup({});

  formActive: string = 'proccess'

  constructor(private diagnosticSrv: DiagnosticService, private route: ActivatedRoute, private companySrv: CompanyService, private router: Router, private toastSrv: ToastrService) { }

  async ngOnInit(): Promise<void> {

    this.getCompany()

    this.diagnosticSrv.getQuestions()
      .then((res) => {
        console.log(res)
        this.questionsProccessList = res[1].items
        this.questionsLawList = res[2].items
        this.questionsTechList = res[3].items
        this.questionsLearningList = res[4].items
        this.generateForm()
      })
      .catch((err) => {
        console.log(err)
      })

  }

  getCompany() {
    const id = this.route.snapshot.paramMap.get('id')
    if (id) {
      this.companySrv.getCompany(id)
      .then((res: any)=> {
        console.log(res)
        this.company = res
      })
    }

  }

  generateForm() {
    this.questionsProccessList.forEach((item) => {
      this.formProccess.addControl(`question_${item._id}`, new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    })
    this.questionsLawList.forEach((item) => {
      this.formLaw.addControl(`question_${item._id}`, new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    })
    this.questionsTechList.forEach((item) => {
      this.formTech.addControl(`question_${item._id}`, new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    })
    this.questionsLearningList.forEach((item) => {
      this.formLearning.addControl(`question_${item._id}`, new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    })
  }

  nextTab(tab: string) {
    this.formActive = tab
    window.scrollTo(0, 0)
  }

  submitDisgnostic() {
    if (this.formProccess.valid && this.formLaw.valid && this.formTech.valid && this.formLearning.valid && this.company) {

      const data: IDiagnostic = {
        company: this.company.id,
        reply: {
          proccess: this.formProccess.value,
          law: this.formLaw.value,
          tech: this.formTech.value,
          learning: this.formLearning.value
        }
      }

      Swal.fire({
        title: 'Só um último aviso...',
        text: "Caso queira revisar as respostas a hora é agora!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Enviar respostas',
        cancelButtonText: 'Vou revisar',
        focusCancel: true,
        showClass: {
          popup: 'animate__animated animate__fadeInDown animate__faster'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp animate__faster'
        }
      }).then((result) => {
        if (result.isConfirmed) {

          this.diagnosticSrv.createDiagnostic(data)
            .then((res) => {
              this.toastSrv.success('Parabéns! Você concluiu com sucesso o Diagnóstico de Conformidade à LGPD', 'PDAgro')
              this.router.navigate(['/views/company'])
              this.diagnosticSrv.animationSuccess.next(true)
            })
            .catch((err) => {
              console.log(err)
            })

        }
      })

    } else {
      this.toastSrv.warning('Verifique se todas as respostas foram informadas e tente novamente!', 'PDAgro')
    }
  }


}
