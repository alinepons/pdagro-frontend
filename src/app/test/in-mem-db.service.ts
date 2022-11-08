import { HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { Auth } from '../models/auth';
import { AuthResponse } from '../models/auth-response';
import { FullUser } from '../models/full-user';

/**
 * Esta classe serve para simular um back-end real.
 */
@Injectable({
  providedIn: 'root'
})
export class InMemDbService implements InMemoryDbService {
  private users: FullUser[] = [];

  constructor() {
    this.users.push(new FullUser({
      fullName: 'teste teste teste',
      username: 'teste@teste',
      password: 'teste',
      email: 'teste@teste',
    }));
  }

  createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
    return { 'users': this.users };
  }

  post(reqInfo: RequestInfo): Observable<any> | null {
    if(reqInfo.resourceUrl.startsWith('auth/login/')) {
      let body = this.authWorker((reqInfo.req as HttpRequest<Auth>).body!);

      if(body)
        return this.test201Response<AuthResponse>(body);

      throw this.test401Response({});
    }

    if(reqInfo.resourceUrl.startsWith('users/')) {
      let body = this.usersWorker((reqInfo.req as HttpRequest<FullUser>).body!);
      return this.test201Response<FullUser>(body);
    }

    return null;
  }

  get(reqInfo: RequestInfo): Observable<any> | null {
    if(reqInfo.resourceUrl.startsWith('users/')) {
      return this.test201Response<FullUser[]>(this.users);
    }

    return null;
  }

  private test201Response<T>(body: T): Observable<HttpResponse<T>> {
    return of(new HttpResponse<T>({ body: body, status: 201  }));
  }

  private test401Response<T>(body: T): HttpErrorResponse {
    return new HttpErrorResponse({ error: body, status: 401  });
  }

  private authWorker(auth: Auth): AuthResponse | null {
    let user = this.users.find(u => u.username === auth.username);

    if(user && user.password === auth.password)
      return new AuthResponse({
        token: 'Aqui poderia ser um JWT.'
      });

    return null;
  }

  private usersWorker(user: FullUser): FullUser {
    user.id = this.users.length + 1;
    this.users.push(user);

    return user;
  }
}

