import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { AuthService } from '../service/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private authSrv: AuthService, private toastrSrv: ToastrService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authSrv.isAuthenticated && this.authSrv.getToken) {
      const user = jwtDecode<any>(this.authSrv.getToken)

      if (user && user.role !== 'admin') {
        return this.router.navigate(['views']);
      }
      return true
    }
    return this.router.createUrlTree(['auth/login']);
  }

}
