import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { faEnvelope, faLock, faArrowRightFromBracket, faKey } from "@fortawesome/free-solid-svg-icons";
import { ToastrService } from "ngx-toastr";
import { Auth } from "src/app/core/models/auth";
import { AuthResponse } from "src/app/core/models/auth-response";
import { AuthService } from "src/app/core/service/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope;
  faLock = faLock;
  faLogin = faArrowRightFromBracket;
  faKey = faKey

  formLogin: FormGroup
  showCode: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toastService: ToastrService,
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

    const model = new Auth({
      email: this.email.value,
      password: this.password.value,
      code: this.code.value
    })

    this.authSrv.login(model)
      .subscribe({
        next: (res: AuthResponse) => {
          this.authSrv.redirectLoginUser(res);
        },
        error: (err) => {

          if (err.error.code === 1005) {
            this.toastService.warning(err.error.message, 'Login')
            this.showCode = true
            return
          }
          if (err.error.message) {
            this.toastService.error(err.error.message, 'Login')
            return
          }
          this.toastService.error('Verifique sua conexão e tente novamente', 'Login')
        }
      })
  }
}

