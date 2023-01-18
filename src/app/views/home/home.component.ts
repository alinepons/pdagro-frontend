import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { IUser } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/service/auth.service';
import Swal from 'sweetalert2';

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

    // Swal.fire({
    //   title: 'Are you sure?',
    //   text: "You won't be able to revert this!",
    //   icon: 'warning',
    //   showCancelButton: true,
    //   confirmButtonColor: '#3085d6',
    //   cancelButtonColor: '#d33',
    //   confirmButtonText: 'Yes, delete it!',
    //   showClass: {
    //     popup: 'animate__animated animate__fadeInDown animate__faster'
    //   },
    //   hideClass: {
    //     popup: 'animate__animated animate__fadeOutUp animate__faster'
    //   }
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     Swal.fire(
    //       'Deleted!',
    //       'Your file has been deleted.',
    //       'success'
    //     )
    //   }
    // })
  }

}
