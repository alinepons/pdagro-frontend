import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { BehaviorSubject, firstValueFrom, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { IAuth, IAuthResponse } from "../models/auth";
import { IUser } from "../models/user";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL: string = environment.URL_BASE;
  private _user: BehaviorSubject<IUser | null> = new BehaviorSubject<IUser | null>(null)
  public user: Observable<IUser | null> = this._user.asObservable()

  constructor(private http: HttpClient, private router: Router, private toastSrv: ToastrService) {}

  get getToken(): string | null {
    return localStorage.getItem('auth.token')
  }

  get isAuthenticated(): boolean {
    return (this.getToken !== null)
  }

  /**
   * Realiza a autenticação do usuário.
   * @param auth Armazena nome de usuário e senha para autenticação.
   * @returns Retorna um Observable que emite true para autenticação com sucesso e false para falha na autenticação (usuário ou senha inválidos).
   * Caso retorne true, então também redireciona o usuário para a página solicitada.
   */
  login(auth: IAuth) {
    return firstValueFrom(this.http.post<IAuthResponse>(`${this.URL}auth/login`, auth))
  }

  register(user: IUser) {
    return firstValueFrom(this.http.post(`${this.URL}auth/register`, user))
  }

  forgotPassword(email: string) {
    return firstValueFrom(this.http.post(`${this.URL}auth/forgot-password`, { email }))
  }

  resetPassword(auth: IAuth) {
    return firstValueFrom(this.http.post(`${this.URL}auth/change-password`, auth))
     
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
