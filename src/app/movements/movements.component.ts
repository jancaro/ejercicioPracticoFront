import { Component, OnInit } from '@angular/core';
import {ClientsService} from "../services/clients/clients.service";
import {AccountsService} from "../services/accounts/accounts.service";
import {MovementsService} from "../services/movements/movements.service";
import {AccountModel} from "../models/account.model";
import {ClientModel} from "../models/client.model";
import {MovementModel} from "../models/movement.model";
import {ReportModel} from "../models/report.model";
import {ReportsService} from "../services/reports/reports.service";
import {AlertService} from "../services/alert/alert.service";

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css']
})
export class MovementsComponent implements OnInit {

  public buscador = '';
  public movements: Array<ReportModel> = [];
  public accounts: Array<AccountModel> = [];
  public clients: Array<ClientModel> = [];
  public movementTypeList = [
    {label: 'Débito', value: 'DEBITO'},
    {label: 'Crédito', value: 'CREDITO'}
  ];

  private _movement: MovementModel = {
    date: new Date(),
    movementType: '',
    amount: 0,
    balance: 0
  };
  private _clientId!: string;
  private _accountId!: string;
  private _clientToSearchId!: string;
  private _dateFrom!: Date;
  private _dateTo!: Date;

  constructor(private clientsService: ClientsService,
              private accountsService: AccountsService,
              private movementsService: MovementsService,
              private reportsService: ReportsService,
              private messageService: AlertService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

  getAccounts(): void {
    this.accountsService.getAccounts(this.clientId).subscribe(accounts => this.accounts = accounts);
  }

  saveMovement(): void {
    this.movementsService.saveMovement(this.movement, this.accountId).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      }
    });
  }

  getMovementsByDates(): void {
    const dateFromTime = new Date(this.dateFrom);
    const dateToTime = new Date(this.dateTo);
    this.movementsService.getMovementsByDates(this.clientToSearchId, dateFromTime.getTime(), dateToTime.getTime())
      .subscribe(movements => this.movements = movements);
  }

  downloadPdf(base64String: string, fileName: string) {
    const source = `data:application/pdf;base64,${base64String}`;
    const link = document.createElement("a");
    link.href = source;
    link.download = `${fileName}.pdf`
    link.click();
  }

  onClickDownloadPdf(){
    let base64String: string;
    const dateFromTime = new Date(this.dateFrom);
    const dateToTime = new Date(this.dateTo);
    this.reportsService.getMovementsByDates(this.clientToSearchId, dateFromTime.getTime(), dateToTime.getTime()).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      },
      next: (resp) => {
        base64String = resp.result;
      },
      complete: () => {
        this.downloadPdf(base64String,`Reporte-${this.dateFrom}-${this.dateTo}`);
      }
    })
  }

  get movement(): MovementModel {
    return this._movement;
  }

  set movement(value: MovementModel) {
    this._movement = value;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(value: string) {
    this._clientId = value;
  }

  get dateFrom(): Date {
    return this._dateFrom;
  }

  set dateFrom(value: Date) {
    this._dateFrom = value;
  }

  get dateTo(): Date {
    return this._dateTo;
  }

  set dateTo(value: Date) {
    this._dateTo = value;
  }

  get accountId(): string {
    return this._accountId;
  }

  set accountId(value: string) {
    this._accountId = value;
  }

  get clientToSearchId(): string {
    return this._clientToSearchId;
  }

  set clientToSearchId(value: string) {
    this._clientToSearchId = value;
  }

}
