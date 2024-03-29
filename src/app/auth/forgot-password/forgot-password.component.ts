import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { IAuth } from "src/app/core/models/auth";
import { AuthService } from "src/app/core/service/auth.service";


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

  formForgotPassword: FormGroup
  showCode: boolean = false
  loading: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private authService: AuthService) {

    this.formForgotPassword = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.minLength(6)])],
      re_password: ['', Validators.compose([Validators.minLength(6)])],
      code: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])]
    })
  }


  get email() { return this.formForgotPassword.get('email')! };
  get password() { return this.formForgotPassword.get('password')! };
  get re_password() { return this.formForgotPassword.get('re_password')! };
  get code() { return this.formForgotPassword.get('code')! };


  ngOnInit(): void {
    const emailTemp = localStorage.getItem('auth.email')
    if (emailTemp) {
      this.email.setValue(emailTemp)
      this.showCode = true

      this.password.setValidators([Validators.required]);
      this.password.updateValueAndValidity()
      this.re_password.setValidators([Validators.required]);
      this.re_password.updateValueAndValidity()
      this.code.setValidators([Validators.required]);
      this.code.updateValueAndValidity()
    }
  }

  resetPassword() {

    if (!this.formForgotPassword.valid) {
      this.toastSrv.warning('Verifique os dados informados e tente novamente!', 'Redefinir senha')
      return
    }

    if (this.password.value !== this.re_password.value) {
      this.toastSrv.warning('As senhas não conferem!', 'Redefinir senha')
      return
    }

    const model: IAuth = {
      email: this.email.value,
      password: this.password.value,
      code: this.code.value
    }
    this.loading = true

    this.authService.resetPassword(model)
      .then((res: any) => {
        this.router.navigate(['auth']);
        localStorage.removeItem('auth.email')
        this.toastSrv.success(res.message, 'Redefinir senha')
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        if (err.error.message) {
          this.toastSrv.error(err.error.message, 'Redefinir senha')
          return
        }
        this.toastSrv.error('Verifique sua conexão e tente novamente', 'Redefinir senha')
      })
  }

  forgotPassword() {

    if (!this.formForgotPassword.valid) {
      this.toastSrv.warning('Verifique os dados informados e tente novamente!', 'Redefinir senha')
      return
    }

    this.loading = true

    this.authService.forgotPassword(this.email.value)
      .then((res: any) => {
        localStorage.setItem('auth.email', this.email.value)
        this.showCode = true
        this.toastSrv.success(res.message, 'Redefinir senha', { timeOut: 10000 })

        this.password.setValidators([Validators.required]);
        this.password.updateValueAndValidity()
        this.re_password.setValidators([Validators.required]);
        this.re_password.updateValueAndValidity()
        this.code.setValidators([Validators.required]);
        this.code.updateValueAndValidity()

        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        if (err.error.message) {
          this.toastSrv.error(err.error.message, 'Redefinir senha')
          return
        }
        this.toastSrv.error('Verifique sua conexão e tente novamente', 'Redefinir senha')
      })
  }

  goForgotPassword() {
    this.router.navigate(['auth/forgot-password'])
  }

  goRegister() {
    this.router.navigate(['auth/register'])
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }
}
