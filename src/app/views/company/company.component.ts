import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/service/company.service';
import { ReplyService } from 'src/app/core/service/reply.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  formCompany: FormGroup
  questionsCompany: any[] = []

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private companySrv: CompanyService,
    private replySrv: ReplyService
  ) {

    this.formCompany = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      cnpj: ['', Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])],
    })
  }

  ngOnInit(): void {

    this.replySrv.getQuestions()
      .then((res) => {
        this.questionsCompany = res[0].items
        console.log(this.questionsCompany)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  get name() { return this.formCompany.get('name')! };
  get cnpj() { return this.formCompany.get('cnpj')! };



  createCompany() {
    if (this.formCompany.valid) {
      this.companySrv.createCompany(this.formCompany.value)
        .subscribe({
          next: (res: any) => {
            console.log(res)
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

}
