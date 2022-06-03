import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ClientsService {
  private apiUrl = '/clientes';

  constructor(private http: HttpClient) { }

  saveClient(body: any): Observable<any> {
    return this.http.post(this.apiUrl, body);
  }

  editClient(body: any, id: string): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, body);
  }

  getClientById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  getClients(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  deleteClient(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
