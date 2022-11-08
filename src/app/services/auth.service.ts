import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from '../models/auth';
import { map, Observable, Subject, tap } from 'rxjs';
import { AuthResponse } from '../models/auth-response';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly pathAuthUser: string = 'http://localhost:3000/auth/login';

  constructor(private http: HttpClient, private router: Router) {
    // Se existe autenticação salva na storage local, então carrega, assim
    // não é preciso ficar autenticando cada vez que acessa a aplicação.
    this.loadFromStorage();
  }

  private _token: string = '';

  get token(): string {
    return this._token
  };

  private _isAuthenticated: boolean = false;

  get isAuthenticated(): boolean {
    return this._isAuthenticated
  };

  /**
   * Realiza a autenticação do usuário.
   * @param auth Armazena nome de usuário e senha para autenticação.
   * @returns Retorna um Observable que emite true para autenticação com sucesso e false para falha na autenticação (usuário ou senha inválidos).
   * Caso retorne true, então também redireciona o usuário para a página solicitada.
   */
  logIn(auth: Auth): Observable<any>{
    return this.http.post<AuthResponse>(this.pathAuthUser, auth)
    .pipe(
      tap((authResponse: AuthResponse) => {
          this.commitLogin(authResponse.token);
          this.redirectLoggedInUser();
      })
    );
  }

  logOut() {
    this.commitLogout();
    this.redirectLoggedOutUser();
  }

  /**
   * Seta informações da autenticação bem sucedida para serem consultadas por outras partes do sistema.
   * @param authResponse Informações da autenticação retornada.
   */
  private commitLogin(token: string) {
    this._token = token;
    this._isAuthenticated = true;
    this.setLocalStorage();
  }

  private commitLogout() {
    this._token = '';
    this._isAuthenticated = false;
    this.clearLocalStorage();
  }

  /**
   * Redireciona o usuário para o caminho solicitado.
   *
   * **O ideal seria salvar o caminho que o usuário solicitou e depois da autenticação redirecionar o usuário para o caminho salvo.
   * Mas pra fins de simplificação sempre redireciona o usuário para a tela inicial, após a autenticação.
   */
  private redirectLoggedInUser() {
    this.router.navigate(['dash']);
  }

  private redirectLoggedOutUser() {
    this.router.navigate(['auth/login']);
  }

  private loadFromStorage() {
    let token = localStorage.getItem('auth.token');
    if(token) {
      this._token = token;
      this._isAuthenticated = true;
    }
  }

  private setLocalStorage() {
    localStorage.setItem('auth.token', this.token);
  }

  private clearLocalStorage() {
    localStorage.clear();
  }
}
