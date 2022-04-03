import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faEnvelope = faEnvelope
  faLock = faLock
  faLogin = faArrowRightFromBracket

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goRegister() {
    this.router.navigate(['auth/register'])
  }

}
