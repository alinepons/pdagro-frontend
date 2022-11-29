import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private URL: string = environment.URL_BASE;

  constructor(private http: HttpClient) { }

  /**
   * Update current user
   * Método para atualizar o usuário
   * @param user 
   * @returns 
   */
  updateUser(user: User): Observable<any> {
    return this.http.put(`${this.URL}users`, user);
  }

  /**
   * Get current user
   * Método para recuperar o usuário atual
   * @returns 
   */
  getUser(): Observable<User> {
    return this.http.get<User>(`${this.URL}users/my`);
  }
}
