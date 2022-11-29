import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { StorageService } from '../service/storage.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authSrv: AuthService, private storageSrv: StorageService, private toastService: ToastrService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const token = this.storageSrv.getToken()
    if (token) {
      request = request.clone({
        setHeaders: { token: token }
      });
    }

    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        if (e.error.message === 'Invalid token') {
          this.authSrv.redirectLogoutUser();
        }
        throw e;
      })
    );
  }
}
