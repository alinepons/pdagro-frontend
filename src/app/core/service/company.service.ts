import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, firstValueFrom, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICompany, ICompanyResponse } from '../models/company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private URL: string = environment.URL_BASE;

  private _company: BehaviorSubject<ICompanyResponse | null> = new BehaviorSubject<ICompanyResponse | null>(null)
  public company: Observable<ICompanyResponse | null> = this._company.asObservable()

  constructor(private http: HttpClient, private router: Router) { }

  get getLocalCompany() {
    const company = localStorage.getItem('company') || null
    if (company) return JSON.parse(company)
  }

  createCompany(company: ICompany) {
    return this.http.post(`${this.URL}company/create`, company)
  }

  deleteCompany(companyId: string) {
    return firstValueFrom(this.http.delete(`${this.URL}company/delete?id=${companyId}`))
  }

  getCompany(id?: string) {
    const END_POINT =  id ? `company/readById?id=${id}` : 'company/readByUser'
    return firstValueFrom(this.http.get(`${this.URL}${END_POINT}`))
  }

  getAllCompany() {
    return firstValueFrom(this.http.get(`${this.URL}company/readAll`))
  }

}
