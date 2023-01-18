import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { AuthService } from '../core/service/auth.service';
import { DiagnosticService } from '../core/service/diagnostic.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/animation/success.json',
    loop: false
  };

  constructor(private router: Router, public authSrv: AuthService, public diagnosticSrv: DiagnosticService) { }

  ngOnInit(): void {
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }

  logout() {
    this.authSrv.redirectLogoutUser()
  }

  onComplete() {
    this.diagnosticSrv.animationSuccess.next(false)
  }
}
