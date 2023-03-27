import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { AnimationOptions } from "ngx-lottie";
import { ToastrService } from "ngx-toastr";
import { IAuth, IAuthResponse } from "src/app/core/models/auth";
import { AuthService } from "src/app/core/service/auth.service";
import { CompanyService } from "src/app/core/service/company.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formLogin: FormGroup
  showCode: boolean = false
  loading: boolean = false

  options: AnimationOptions = {
    path: '/assets/animation/loadingButton.json'
  };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastSrv: ToastrService,
    private companySrv: CompanyService,
    private authSrv: AuthService) {

    this.formLogin = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      code: [null, Validators.compose([Validators.minLength(6), Validators.maxLength(6)])]
    })
  }


  get email() { return this.formLogin.get('email')! };
  get password() { return this.formLogin.get('password')! };
  get code() { return this.formLogin.get('code')! };

  ngOnInit(): void {

  }

  goForgotPassword() {
    this.router.navigate(['auth/forgot-password'])
  }

  goRegister() {
    this.router.navigate(['auth/register'])
  }

  login() {

    if (!this.formLogin.valid) return;

    const model: IAuth = {
      email: this.email.value,
      password: this.password.value,
      code: this.code.value
    }

    this.loading = true
    localStorage.clear()
    
    this.authSrv.login(model)
      .then((res: IAuthResponse) => {
        this.authSrv.redirectLoginUser(res);
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        if (err.error.code === 1005) {
          this.toastSrv.warning(err.error.message, 'Login')
          this.showCode = true
          return
        }
        if (err.error.message) {
          this.toastSrv.error(err.error.message, 'Login')
          return
        }
        this.toastSrv.error('Verifique sua conexão e tente novamente', 'Login')
        
      })
  }
}

