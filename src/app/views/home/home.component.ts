import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { IUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  options: AnimationOptions = {
    path: '/assets/animation/data.json',
  };

  public user!: IUser

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
