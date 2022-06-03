import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  private apiUrl = '/cuentas';

  constructor(private http: HttpClient) { }

  saveAccount(body: any, clientId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cliente/${clientId}`, body);
  }

  editAccount(body: any, clientId: string, accountId: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/cliente/${clientId}/cuenta/${accountId}`, body);
  }

  getAccountById(accountId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${accountId}`);
  }

  getAccounts(clientId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${clientId}`);
  }

  deleteAccount(accountId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${accountId}`);
  }
}
