import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  
  goLogin() {
    this.router.navigate(['auth/login'])
  }

  logout() {
    this.router.navigate(['views'])
  }
}
