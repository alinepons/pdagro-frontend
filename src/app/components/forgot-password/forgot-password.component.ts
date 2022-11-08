import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket, faArrowRotateRight,  } from '@fortawesome/free-solid-svg-icons';
import { AuthenticationService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  faEnvelope = faEnvelope
  faRotateRight = faArrowRotateRight
  faLogin = faArrowRightFromBracket
  email = '';
  //senha = '';

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

}
