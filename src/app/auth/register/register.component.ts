import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  formRegister: FormGroup

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService,
    private toastService: ToastrService) {

    this.formRegister = this.fb.group({
      fullname: ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[_a-z0-9-]+(\.[_a-z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+).(\.[a-z]{2,3})$')])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      re_password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      cpf: ['', Validators.compose([Validators.required])]
    })

  }

  ngOnInit(): void {
  }

  get fullname(): AbstractControl { return this.formRegister.get('fullname')! };
  get email(): AbstractControl { return this.formRegister.get('email')! };
  get password(): AbstractControl { return this.formRegister.get('password')! };
  get re_password(): AbstractControl { return this.formRegister.get('re_password')! };
  get cpf(): AbstractControl { return this.formRegister.get('cpf')! };

  register() {

    if (!this.formRegister.valid) {
      this.toastService.warning('Verifique os dados informados e tente novamente!', 'Cadastro')
      return
    }

    if (this.password.value !== this.re_password.value) {
      this.toastService.warning('As senhas não conferem!', 'Cadastro')
      return
    }

    const model = new User({
      fullname: this.fullname.value,
      email: this.email.value,
      password: this.password.value,
      cpf: this.cpf.value
    })

    this.authService.register(model)
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }

}
