import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ICompany } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private URL: string = environment.URL_BASE;

  constructor(private http: HttpClient) {

  }

  createCompany(company: ICompany) {
    return this.http.post(`${this.URL}company/create`, company)
  }

}
