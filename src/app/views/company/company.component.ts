import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompanyService } from 'src/app/core/service/company.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  formCompany: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private companySrv: CompanyService) {

    this.formCompany = this.fb.group({
      name: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')])],
      phone: ['', Validators.compose([Validators.required, Validators.minLength(14), Validators.maxLength(15)])],
      cnpj: ['', Validators.compose([Validators.required, Validators.minLength(18), Validators.maxLength(18)])],
      website: ['']
    })
  }

  ngOnInit(): void {

  }

  get name() { return this.formCompany.get('name')! };
  get email() { return this.formCompany.get('email')! };
  get phone() { return this.formCompany.get('phone')! };
  get cnpj() { return this.formCompany.get('cnpj')! };
  get website() { return this.formCompany.get('website')! };


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
