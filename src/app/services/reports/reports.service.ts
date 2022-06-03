import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  private apiUrl = '/reporte';

  constructor(private http: HttpClient) { }

  getMovementsByDates(clientId: string, dateFrom: any, dateTo: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/cliente/${clientId}/${dateFrom}/${dateTo}`);
  }
}
