import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, firstValueFrom, Observable, tap } from "rxjs";
import { environment } from "src/environments/environment";
import { Auth } from "../models/auth";
import { AuthResponse } from "../models/auth-response";
import { User } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.URL_BASE;
  private _user: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null)
  public user: Observable<User | null> = this._user.asObservable()

  constructor(private http: HttpClient, private router: Router, private toastService: ToastrService) {

  }

  get token(): string | null {
    return localStorage.getItem('auth.token')
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
  login(auth: Auth) {
    return this.http.post<AuthResponse>(`${this.URL}auth/login`, auth)
  }

  register(user: User) {
    this.http.post(`${this.URL}auth/register`, user)
      .subscribe({
        next: (res) => {
          this.router.navigate(['auth']);
          this.toastService.success('Cadastro realizado com sucesso!', 'Cadastro')
        },
        error: (err) => {
          if (err.error.message) {
            this.toastService.error(err.error.message, 'Cadastro')
            return
          }
          this.toastService.error('Verifique sua conexão e tente novamente', 'Cadastro')
        }
      })
  }

  forgotPassword(email: string) {
    return this.http.post(`${this.URL}auth/forgot-password`, { email })
  }

  resetPassword(auth: Auth) {
    this.http.post(`${this.URL}auth/change-password`, auth)
      .subscribe({
        next: (res: any) => {
          this.router.navigate(['auth']);
          localStorage.removeItem('auth.email')
          this.toastService.success(res.message, 'Redefinir senha')
        },
        error: (err) => {
          if (err.error.message) {
            this.toastService.error(err.error.message, 'Redefinir senha')
            return
          }
          this.toastService.error('Verifique sua conexão e tente novamente', 'Redefinir senha')
        }
      })
  }

  /**
   * Redireciona o usuário para o caminho solicitado.
   *
   * **O ideal seria salvar o caminho que o usuário solicitou e depois da autenticação redirecionar o usuário para o caminho salvo.
   * Mas pra fins de simplificação sempre redireciona o usuário para a tela inicial, após a autenticação.
   */
  redirectLoginUser(res: AuthResponse) {
    this._user.next(res.user)
    localStorage.setItem('auth.token', res.token)
    this.router.navigate(['views']);
  }

  redirectLogoutUser() {
    localStorage.clear()
    this.router.navigate(['auth']);
  }

}
