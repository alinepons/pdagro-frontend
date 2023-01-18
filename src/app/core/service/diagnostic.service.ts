import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiagnostic } from '../models/diagnostic';
import { IQuestions } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class DiagnosticService {

  private URL: string = environment.URL_BASE;
  public animationSuccess: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)

  constructor(private http: HttpClient) { }

  getQuestions() {
    return firstValueFrom(this.http.get<IQuestions[]>(`${this.URL}diagnostic/questions`))
  }

  createDiagnostic(data: IDiagnostic) {
    return firstValueFrom(this.http.post<IDiagnostic>(`${this.URL}diagnostic/create`, data))
  }

}
