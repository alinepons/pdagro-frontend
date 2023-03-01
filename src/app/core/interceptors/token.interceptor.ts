import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService, private toastSrv: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.authSrv.getToken
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${token}` }
      })
    }

    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        console.log(e)
        if (e.status === 401 && e.statusText === 'Unauthorized') {
          this.toastSrv.warning('Sua sessão expirou. Faça login novamente!', 'PDAgro')
          this.authSrv.redirectLogoutUser();
        }
        throw e;
      })
    );
  }
}
