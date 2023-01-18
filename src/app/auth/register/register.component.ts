import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup
  accept: boolean = false
  loading: boolean = false

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastSrv: ToastrService
  ) {

    this.formRegister = this.fb.group({
      fullname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      re_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    })

  }

  ngOnInit(): void {
  }

  get fullname(): AbstractControl { return this.formRegister.get('fullname')! };
  get email(): AbstractControl { return this.formRegister.get('email')! };
  get password(): AbstractControl { return this.formRegister.get('password')! };
  get re_password(): AbstractControl { return this.formRegister.get('re_password')! };

  register() {

    if (!this.formRegister.valid) {
      this.toastSrv.warning('Verifique os dados informados e tente novamente!', 'Cadastro')
      return
    }

    if (!this.accept) {
      this.toastSrv.warning('É necessário estar de acordo e aceitar as regras informadas!', 'Cadastro')
      return
    }

    if (this.password.value !== this.re_password.value) {
      this.toastSrv.warning('As senhas não conferem!', 'Cadastro')
      return
    }

    const model: IUser = {
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value
    }

    this.authService.register(model)
      .then((res) => {
        this.router.navigate(['auth']);
        this.toastSrv.success('Cadastro realizado com sucesso!', 'Cadastro')
        this.loading = false
      })
      .catch((err) => {
        this.loading = false
        if (err.error.message) {
          this.toastSrv.error(err.error.message, 'Cadastro')
          return
        }
        this.toastSrv.error('Verifique sua conexão e tente novamente', 'Cadastro')
      })
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }

}
