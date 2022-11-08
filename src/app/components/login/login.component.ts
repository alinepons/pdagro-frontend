import { HttpErrorResponse } from '@angular/common/http';
import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs';
import { Auth } from 'src/app/models/auth';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  submitted: boolean = false;

  faEnvelope = faEnvelope;
  faLock = faLock;
  faLogin = faArrowRightFromBracket;

  model: FormGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]],
  });

  get username(): AbstractControl { return this.model.get('username')! };
  get password(): AbstractControl { return this.model.get('password')! };

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private toast: ToastrService,
    private authService: AuthenticationService) {}

  ngOnInit(): void {

  }

  goForgotPassword() {
    this.router.navigate(['auth/forgot-password'])
    }

  goRegister() {
  this.router.navigate(['auth/register'])
  }

  logIn() {
    this.submitted = true;

    if(!this.model.valid)
      return;

    this.authService.logIn(new Auth({
      username: this.model.controls['username'].value,
      password: this.model.controls['password'].value,
    }))
    .pipe(
      catchError((err: HttpErrorResponse) => {
        if(err.status === 401)
          this.toast.error("Usuário ou senha inválidos.", "Ops, ocorreu um problema!");
        else
          this.toast.error("Ocorreu um problema, favor tentar novamente.", "Ops, ocorreu um problema!");

        throw err;
      })
    )
    .subscribe(() => {
        this.toast.success("Login realizado com sucesso.", "Sucesso!");
    });
  }
}

