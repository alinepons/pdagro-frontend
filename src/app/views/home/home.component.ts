import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public user!: User

  constructor(private authService: AuthService) {
    this.authService.user.subscribe({
      next: (user) => {
        if (user) this.user = user
      }

    })
  }

  ngOnInit(): void {
  }

}
