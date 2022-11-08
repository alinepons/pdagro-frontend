import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FullUser } from '../models/full-user';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly pathInsertUser: string = 'http://localhost:3000/users';
  private readonly pathMyUser: string = 'http://localhost:3000/users/my';

  constructor(private http: HttpClient) { }

  insert(user: FullUser): Observable<any> {
    return this.http.post(this.pathInsertUser, user);
  }

  myUser(): Observable<User> {
    return this.http.get<User>(this.pathMyUser);
  }
}
