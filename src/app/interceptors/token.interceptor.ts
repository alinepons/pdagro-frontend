import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { right } from '@popperjs/core';
import { catchError, Observable } from 'rxjs';
import { AuthenticationService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private authService: AuthenticationService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.token)
      request = request.clone({
        setHeaders: { Authorization: `Bearer ${this.authService.token}` }
      });

    return next.handle(request).pipe(
      catchError((e: HttpErrorResponse) => {
        // Se recebe um 401 do servidor, então significa que o token está incorreto/vencido, então
        // redireciona para o logIn.
        //
        // Obs. É interessante implementar algo para avisar o usuário antes do token vencer.
        //
        if (e.status === 401) {
          this.authService.logOut();
        }

        throw e;
      })
    );
  }
}
