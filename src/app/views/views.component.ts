import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  constructor(private router: Router, public authSrv: AuthService) { }

  ngOnInit(): void {
  }
  
  goLogin() {
    this.router.navigate(['auth/login'])
  }

  logout() {
    this.authSrv.redirectLogoutUser()
  }
}
