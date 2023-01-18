import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';
import { CompanyService } from '../service/company.service';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticGuard implements CanActivate {

  constructor(private authSrv: AuthService, private companySrv: CompanyService, private toastrSrv: ToastrService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authSrv.isAuthenticated && this.authSrv.getToken) {
      const user = jwtDecode<any>(this.authSrv.getToken)
      const company = this.companySrv.getCompany
      if (user && company && company.user === user.userId) {
        return true
      }
      localStorage.removeItem('company')
      this.toastrSrv.warning('Cadastre sua empresa para acessar o diagnóstico.', 'PDAgro')
      return this.router.createUrlTree(['views/company']);
    }
    return this.router.createUrlTree(['auth/login']);
  }

}
