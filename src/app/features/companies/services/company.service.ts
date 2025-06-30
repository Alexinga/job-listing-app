import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Company, NewCompany } from '../models/company';
import { headers } from '../../../../environments/environment';
import { catchError, map, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class CompanyService {
  private http = inject(HttpClient);
  private companyURL =
    'https://yonxcfogpkhznygsaugw.supabase.co/rest/v1/company';
  companyData = signal<Company[]>([]);
  loadedCompanyData = this.companyData.asReadonly();

  getCompanies() {
    return this.http
      .get<Company[]>(`${this.companyURL}?select=*`, { headers })
      .pipe(
        map((res) => res),
        catchError((error: HttpErrorResponse) => {
          const message =
            error.message || `Error ${error.status} : ${error.statusText}`;
          return throwError(() => new Error(message));
        })
      );
  }

  postCompanies(newCompany: NewCompany) {
    return this.http.post<NewCompany>(this.companyURL, newCompany, { headers });
  }

  deleteCompany(id: number) {
    return this.http.delete<Company>(`${this.companyURL}?id=eq.${id}`, {
      headers,
    });
  }
}
