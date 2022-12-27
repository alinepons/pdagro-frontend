import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyGuard implements CanActivate {

  constructor(private authSrv: AuthService, private toastrSrv: ToastrService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {      

    if (this.authSrv.isAuthenticated && this.authSrv.token) {
      const user = jwtDecode<any>(this.authSrv.token)
      if(user && user.company && user.company.length > 0) {
        return true
      }
      this.toastrSrv.warning('Cadastre sua empresa para acessar esse recurso.', 'PDAgro')
      return this.router.createUrlTree(['views/company']);
    }
    return this.router.createUrlTree(['auth/login']);
  }

}
