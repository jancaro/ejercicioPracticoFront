import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovementsService {

  private apiUrl = '/movimientos';

  constructor(private http: HttpClient) { }

  saveMovement(body: any, accountId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/cuenta/${accountId}`, body);
  }

  getMovementsByDates(clientId: string, dateFrom: any, dateTo: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${clientId}/${dateFrom}/${dateTo}`);
  }
}
