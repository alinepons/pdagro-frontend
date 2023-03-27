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

  getCertificate(data: any) {
    let headers: any = { responseType: 'blob' }
    return firstValueFrom(this.http.post<any>(`${this.URL}diagnostic/certificate`, { data }, headers))
  }

  createDiagnostic(data: IDiagnostic) {
    return firstValueFrom(this.http.post<IDiagnostic>(`${this.URL}diagnostic/create`, data))
  }

  getFeedback() {
    return firstValueFrom(this.http.get<any>(`${this.URL}diagnostic/feedback/user`))
  }

  getAllFeedback() {
    return firstValueFrom(this.http.get<any>(`${this.URL}diagnostic/feedback/all`))
  }

  deleteDiagnostic(id: string) {
    return firstValueFrom(this.http.delete<any>(`${this.URL}diagnostic/delete?id=${id}`))
  }

}
