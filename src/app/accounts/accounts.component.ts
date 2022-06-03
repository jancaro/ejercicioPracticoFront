import { Component, OnInit } from '@angular/core';
import {AccountModel} from "../models/account.model";
import {ClientModel} from "../models/client.model";
import {ClientsService} from "../services/clients/clients.service";
import {AccountsService} from "../services/accounts/accounts.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  public showUpdateAccount = false;
  public buscador = '';
  public accounts: Array<AccountModel> = [];
  public clients: Array<ClientModel> = [];
  public accountTypeList = [
    {label: 'Ahorro', value: 'AHORRO'},
    {label: 'Corriente', value: 'CORRIENTE'}
  ];

  private _accountToEdit!: AccountModel;
  private _account: AccountModel = {
    id: '',
    accountNumber: '',
    accountType: '',
    initialBalance: 0,
    status: true
  };
  private _clientId!: string;

  constructor(private clientsService: ClientsService,
              private accountsService: AccountsService,
              private messageService: MessageService) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

  saveAccount(): void {
    this.accountsService.saveAccount(this.account, this.clientId).subscribe({
      error: (error) => {
        console.log(error);
        this.messageService.add(error.error);
      },
      complete: () => {
        this.getAccounts();
      }
    });
  }

  editAccount(account: AccountModel): void {
    this.accountToEdit = Object.assign({}, account);
    this.showUpdateAccount = true;
  }

  updateAccount(): void {
    this.showUpdateAccount = false;
    this.accountsService.editAccount(this.accountToEdit, this.clientId, this.accountToEdit.id).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      },
      complete: () => {
        this.getAccounts();
      }
    });
  }

  getAccounts(): void {
    this.accountsService.getAccounts(this.clientId).subscribe(accounts => this.accounts = accounts);
  }

  deleteAccount(account: AccountModel): void {
    this.accountsService.deleteAccount(account.id).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      },
      complete: () => {
        this.getAccounts();
      }
    });
  }

  get accountToEdit(): AccountModel {
    return this._accountToEdit;
  }

  set accountToEdit(value: AccountModel) {
    this._accountToEdit = value;
  }

  get account(): AccountModel {
    return this._account;
  }

  set account(value: AccountModel) {
    this._account = value;
  }

  get clientId(): string {
    return this._clientId;
  }

  set clientId(value: string) {
    this._clientId = value;
  }

}
