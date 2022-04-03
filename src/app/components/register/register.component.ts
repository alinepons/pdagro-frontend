import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faLock, faCheck, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  faEnvelope = faEnvelope
  faLock = faLock
  faCheck = faCheck
  faUser = faUser
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goLogin() {
this.router.navigate(['auth'])
  }

}
