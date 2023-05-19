import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ModalResultComponent } from 'src/app/components/modal-result/modal-result.component';
import { ICompany } from 'src/app/core/models/company';
import { CompanyService } from 'src/app/core/service/company.service';
import { DiagnosticService } from 'src/app/core/service/diagnostic.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss'],
  providers: [DatePipe],
})
export class CompanyComponent implements OnInit {

  formCompany: FormGroup = new FormGroup({})
  formQuestions: FormGroup = new FormGroup({})

  questionsCompany: any[] = []

  questionsProccess: any[] = []
  questionsLaw: any[] = []
  questionsTech: any[] = []
  questionsLearning: any[] = []

  resultProccess: any[] = []
  resultLaw: any[] = []
  resultTech: any[] = []
  resultLearning: any[] = []

  activityOptions: string[] = []

  view: string = 'LIST'

  company: any[] = []
  pesos: any = {} as any
  feedback: any = {} as any

  constructor(
    private toastSrv: ToastrService,
    private companySrv: CompanyService,
    private diagnosticSrv: DiagnosticService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private datePipe: DatePipe  ) {

    this.formCompany.addControl('name', new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])))
    this.formCompany.addControl('cnpj', new FormControl(null, Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(18)])))
  }


  ngOnInit(): void {
    this.getQuestions()
    this.getCompany()
  }

  getQuestions() {
    this.diagnosticSrv.getQuestions()
      .then((res: any) => {
        this.questionsCompany = res[0].items

        this.questionsProccess = res[1].items
        this.questionsLaw = res[2].items
        this.questionsTech = res[3].items
        this.questionsLearning = res[4].items

        this.generateFormQuestions(this.questionsCompany)
        this.pesos["proccess"] = res[1].weight_dimension
        this.pesos["law"] = res[2].weight_dimension
        this.pesos["tech"] = res[3].weight_dimension
        this.pesos["learning"] = res[4].weight_dimension
      })
      .catch((err: any) => {
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

  resetForm() {
    this.getCompany()
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
          next: () => {
            this.toastSrv.success('Empresa cadastrada com sucesso!', 'PDAgro')
            this.resetForm()
          },
          error: (err: any) => {
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
    console.log(id)
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
        // rotina de exclusao da empresa e todos os diagnosticos

        this.companySrv.deleteCompany(id)
          .then(() => {
            this.toastSrv.success('Empresa excluída com sucesso!', 'PDAgro')
            this.getCompany()
          })
          .catch((err) => {
            console.log(err)
            if (err.error && err.error.message) {
              this.toastSrv.error(err.error.message, 'PDAgro')
              return
            }
            this.toastSrv.error('Verifique sua conexão e tente novamente', 'PDAgro')
          })
      }
    })
  }

  openDiagnostic(company: any, diagnostic: any) {

    this.resultProccess = []
    this.resultLaw = []
    this.resultTech = []
    this.resultLearning = []

    Object.keys(diagnostic.reply.proccess).forEach(k => {
      this.resultProccess.push(diagnostic.reply.proccess[k])
    })
    Object.keys(diagnostic.reply.law).forEach(k => {
      this.resultLaw.push(diagnostic.reply.law[k])
    })
    Object.keys(diagnostic.reply.tech).forEach(k => {
      this.resultTech.push(diagnostic.reply.tech[k])
    })
    Object.keys(diagnostic.reply.learning).forEach(k => {
      this.resultLearning.push(diagnostic.reply.learning[k])
    })

    const data = {
      _id: diagnostic.id,
      name: company.name,
      cnpj: company.cnpj,
      pesos: this.pesos,
      info: company.info,
      questions: {
        proccess: this.questionsProccess,
        law: this.questionsLaw,
        tech: this.questionsTech,
        learning: this.questionsLearning
      },
      diagnostic: {
        proccess: this.resultProccess,
        law: this.resultLaw,
        tech: this.resultTech,
        learning: this.resultLearning
      },
      created_at: this.datePipe.transform(diagnostic.created_at, 'dd/MM/yyyy HH:mm'),
      resultRate: this.buildFinalResults(diagnostic).rate,
      image: this.buildFinalResults(diagnostic).image,
      result: this.buildFinalResults(diagnostic).result,
    }
    console.log(data)
    const modalRef = this.modalService.open(ModalResultComponent, { size: 'xl', keyboard: false });
    modalRef.componentInstance.data = data

    modalRef.dismissed.subscribe({
      next: (res) => {
        if (res === 'delete') {
          this.getQuestions()
          this.getCompany()
        }
      }
    })
  }

  buildFinalResults(diagnostic: any) {

    // Média por dimensão
    // P1 = weight_option
    // S1 = weight_question
    // T1 = weight_option * weight_question
    // soma entre eles depois divide pela soma dos S1... S4

    // Média ponderada
    // P1 = weight_option
    // PD1 = peso da dimensao
    // P1 x PD1
    // soma entre eles depois divide pela soma dos PD1... PD4

    // Fator de correcao
    // Q1 = quantidade de questoes de cada dimensao
    // PD1 = peso da dimensao
    // Q1 x PD1
    // soma entre eles depois divide pela soma dos PD1... PD4

    // Media ponderada - Fator de correcao

    this.resultProccess = []
    this.resultLaw = []
    this.resultTech = []
    this.resultLearning = []

    Object.keys(diagnostic.reply.proccess).forEach(k => {
      this.resultProccess.push(diagnostic.reply.proccess[k])
    })
    Object.keys(diagnostic.reply.law).forEach(k => {
      this.resultLaw.push(diagnostic.reply.law[k])
    })
    Object.keys(diagnostic.reply.tech).forEach(k => {
      this.resultTech.push(diagnostic.reply.tech[k])
    })
    Object.keys(diagnostic.reply.learning).forEach(k => {
      this.resultLearning.push(diagnostic.reply.learning[k])
    })

    let T1 = 0
    let P1 = 0
    let S1 = 0
    let Q1 = this.resultProccess.length
    let PD1 = this.pesos.proccess

    let T2 = 0
    let P2 = 0
    let S2 = 0
    let Q2 = this.resultLaw.length
    let PD2 = this.pesos.law

    let T3 = 0
    let P3 = 0
    let S3 = 0
    let Q3 = this.resultTech.length
    let PD3 = this.pesos.tech

    let T4 = 0
    let P4 = 0
    let S4 = 0
    let Q4 = this.resultLearning.length
    let PD4 = this.pesos.learning

    this.resultProccess.forEach((x: any) => {
      P1 += x.weight_option
      T1 += (x.weight_question * x.weight_option)
      S1 += x.weight_question
    })

    this.resultLaw.forEach((x: any) => {
      P2 += x.weight_option
      T2 += (x.weight_question * x.weight_option)
      S2 += x.weight_question
    })

    this.resultTech.forEach((x: any) => {
      P3 += x.weight_option
      T3 += (x.weight_question * x.weight_option)
      S3 += x.weight_question
    })

    this.resultLearning.forEach((x: any) => {
      P4 += x.weight_option
      T4 += (x.weight_question * x.weight_option)
      S4 += x.weight_question
    })

    // PONTOS DIMENSAO
    // PESO QUESTAO
    // PESO OPCAO ESCOLHIDA

    // Cálculo da Média Ponderada por Dimensão
    //let pontuacao_dimensao = PQ * POE / SOMA PQ

    let R1 = T1 / S1
    let R2 = T2 / S2
    let R3 = T3 / S3
    let R4 = T4 / S4

    // Cálculo do fator
    // deve ser multiplicado pelo nro de questões
    // PESO DIMENSÃO

    let F1 = (Q1 * PD1) 
    let F2 = (Q2 * PD2)
    let F3 = (Q3 * PD3)
    let F4 = (Q4 * PD4)

    let den = (PD1 + PD2 + PD3 + PD4)

    // let pontuação_dimensão sem o fator
    //let M1 = (P1 * PD1) /den
    //let M2 = (P2 * PD2) /den
    //let M3 = (P3 * PD3) /den
    //let M4 = (P4 * PD4) /den    

    //Média final com fator
    let M1 = R1 === 1 ? (P1 * PD1) / den - (F1 / den) : (P1 * PD1) / den
    let M2 = R2 === 1 ? (P2 * PD2) / den - (F2 / den) : (P2 * PD2) / den
    let M3 = R3 === 1 ? (P3 * PD3) / den - (F3 / den) : (P3 * PD3) / den
    let M4 = R4 === 1 ? (P4 * PD4) / den - (F4 / den) : (P4 * PD4) / den

    // VERIFICAR SE ALGUMA DAS DIMENSOES O RESULTADO FOI IGUAL A 1 E APLICAR O FATOR

    let M = M1 + M2 + M3 + M4

    let rate = Math.ceil(M)

    const setImageBelt = (rate: number) => {
      if (rate <= 5) {
        // white belt
        return `${environment.URL_BASE}public/white_belt.png`
      } else if (rate > 5 && rate <= 10) {
        // yellow belt
        return `${environment.URL_BASE}public/yellow_belt.png`
      } else if (rate > 10 && rate <= 15) {
        // green belt
        return `${environment.URL_BASE}public/green_belt.png`
      } else if (rate > 15 && rate <= 20) {
        // black belt
        return `${environment.URL_BASE}public/black_belt.png`
      } else {
        // master black belt
        return `${environment.URL_BASE}public/master_black_belt.png`
      }
    }

    const setTextResult = (rate: number) => {
      if (rate <= 5) {
        // white belt
        return 'Não existe alinhamento à LGPD'
      } else if (rate > 5 && rate <= 10) {
        // yellow belt
        return 'Alinhamento inicial, existe um projeto de adequação básico'
      } else if (rate > 10 && rate <= 15) {
        // green belt
        return 'Projeto de adequação à LGPD intermediário em andamento'
      } else if (rate > 15 && rate <= 20) {
        // black belt
        return 'Compliance à proteção de dados, trabalha na implementação do projeto de adequação'
      } else {
        // master black belt
        return 'Consolidação de processos, tecnologias, conhece a LGPD e incentiva o aprendizado dos seus colaboradores'
      }
    }

    return {
      rate,
      image: setImageBelt(rate),
      result: setTextResult(rate)
    }

  }

}
