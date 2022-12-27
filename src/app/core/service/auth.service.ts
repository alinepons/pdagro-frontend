import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuth } from "../models/auth";
import { IAuthResponse } from "../models/auth-response";
import { ICompany } from "../models/company";
import { IUser } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.URL_BASE;
  private _user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  public user: Observable<IUser | null> = this._user.asObservable()

  private _businessUser: BehaviorSubject<ICompany[] | null> = new BehaviorSubject<ICompany[] | null>(null)
  public businessUser: Observable<ICompany[] | null> = this._businessUser.asObservable()

  constructor(private http: HttpClient, private router: Router, private toastSrv: ToastrService) {

  }

  get token(): string | null {
    return localStorage.getItem('auth.token')
  }

  get business(): string | null {
    return localStorage.getItem('auth.business')
  }

  get isAuthenticated(): boolean {
    return (this.token !== null)
  }

  /**
   * Realiza a autenticação do usuário.
   * @param auth Armazena nome de usuário e senha para autenticação.
   * @returns Retorna um Observable que emite true para autenticação com sucesso e false para falha na autenticação (usuário ou senha inválidos).
   * Caso retorne true, então também redireciona o usuário para a página solicitada.
   */
  login(auth: IAuth) {
    return this.http.post<IAuthResponse>(`${this.URL}auth/login`, auth)
  }

  register(user: IUser) {
    this.http.post(`${this.URL}auth/register`, user)
      .subscribe({
        next: (res) => {
          this.router.navigate(['auth']);
          this.toastSrv.success('Cadastro realizado com sucesso!', 'Cadastro')
        },
        error: (err) => {
          if (err.error.message) {
            this.toastSrv.error(err.error.message, 'Cadastro')
            return
          }
          this.toastSrv.error('Verifique sua conexão e tente novamente', 'Cadastro')
        }
      })
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.URL}auth/forgot-password`, { email })
  }

  resetPassword(auth: IAuth) {
    this.http.post(`${this.URL}auth/change-password`, auth)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['auth']);
          localStorage.removeItem('auth.email')
          this.toastSrv.success(res.message, 'Redefinir senha')
        },
        error: (err) => {
          if (err.error.message) {
            this.toastSrv.error(err.error.message, 'Redefinir senha')
            return
          }
          this.toastSrv.error('Verifique sua conexão e tente novamente', 'Redefinir senha')
        }
      })
  }

  /**
   * Redireciona o usuário para o caminho solicitado.
   *
   * **O ideal seria salvar o caminho que o usuário solicitou e depois da autenticação redirecionar o usuário para o caminho salvo.
   * Mas pra fins de simplificação sempre redireciona o usuário para a tela inicial, após a autenticação.
   */
  redirectLoginUser(res: IAuthResponse) {
    this._user.next(res.user)
    localStorage.setItem('auth.token', res.token)
    this.router.navigate(['views']);
  }

  redirectLogoutUser() {
    localStorage.clear()
    this.router.navigate(['views']);
  }

}
