import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IQuestions } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class ReplyService {

  private URL: string = environment.URL_BASE;

  constructor(private http: HttpClient) {

  }

  getQuestions() {
    return firstValueFrom(this.http.get<IQuestions[]>(`${this.URL}reply/question`))
  }
}
