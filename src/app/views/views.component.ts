import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { AuthService } from '../core/service/auth.service';
import { DiagnosticService } from '../core/service/diagnostic.service';

@Component({
  selector: 'app-views',
  templateUrl: './views.component.html',
  styleUrls: ['./views.component.scss']
})
export class ViewsComponent implements OnInit {

  constructor(private router: Router, public authSrv: AuthService, public diagnosticSrv: DiagnosticService, private toastSrv: ToastrService) { }

  ngOnInit(): void {
  }

  goLogin() {
    this.router.navigate(['auth/login'])
  }

  goAdmin() {
    this.router.navigate(['views/admin'])
  }

  deleteAccount() {
    Swal.fire({
      title: 'Excluir conta?',
      text: "Essa ação não pode ser revertida!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Avançar',
      cancelButtonText: 'Cancelar',
      focusCancel: true
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Digite sua senha',
          input: 'password',
          inputAttributes: {
            autocapitalize: 'off'
          },
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Excluir',
          cancelButtonText: 'Cancelar',
          focusCancel: true,
          showLoaderOnConfirm: true,
          preConfirm: (password) => {
            return this.authSrv.deleteAccount(password)
              .then(res => {
                if (!res) {
                  throw new Error('Erro ao excluir conta!')
                }
                return res
              })
              .catch(error => {
                console.log(error)
                Swal.showValidationMessage(error.error.message)
              })
          },
          allowOutsideClick: () => !Swal.isLoading()
        }).then((result) => {
          if (result.isConfirmed) {
            this.toastSrv.success('Conta excluída com sucesso!', 'PDAgro')
            this.authSrv.redirectLogoutUser()
          }
        })

      }
    })
  }

  logout() {
    this.authSrv.redirectLogoutUser()
  }


}
