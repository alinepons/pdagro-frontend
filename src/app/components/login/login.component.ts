import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope
  faLock = faLock
  faLogin = faArrowRightFromBracket
  email = '';
  senha = '';


  constructor(
    private router: Router,
    private authService: AuthenticationService) {}

  ngOnInit(): void {
   
  }

  goForgotPassword() {
    this.router.navigate(['auth/forgot-password'])
    }

  goRegister() {
  this.router.navigate(['auth/register'])
  }

  async login() {
    await this.authService.authenticate(this.email, this.senha)
      .then(() => {
        console.log('Autenticado com sucesso'); // this.router.navegate(['registerCompany']);
      }).catch ((error) => {
        alert('Usuário ou senha inválido');
        console.log(error);
      }
    );
  }
}

