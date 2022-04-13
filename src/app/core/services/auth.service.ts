import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
//import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient) { }
  async authenticate(email: string, senha: string): Promise<any>{
    return this.http.post('http://localhost:3000/user/login', {
      userName: email,
      password: senha,
    });
  }
}
