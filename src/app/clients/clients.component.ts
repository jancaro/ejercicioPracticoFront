import {Component, OnInit} from '@angular/core';

import {ClientModel} from "../models/client.model";
import {ClientsService} from "../services/clients/clients.service";
import {MessageService} from "../message.service";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  public typeButtonPassword = 'password';
  public typeEditButtonPassword = 'password';
  public buscador = '';
  public showUpdateClient = false;
  public clients: Array<ClientModel> = [];
  public genderList = [
    {label: 'Masculino', value: 'MASCULINO'},
    {label: 'Femenino', value: 'FEMENINO'},
    {label: 'Otro', value: 'OTRO'}
  ];

  private _clientToEdit!: ClientModel;
  private _model: ClientModel = {
    id: '',
    name: '',
    gender: '',
    age: 1,
    identification: '',
    direction: '',
    phone: '',
    password: '',
    status: true
  };

  constructor(private clientsService: ClientsService,
              private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientsService.getClients().subscribe(clients => this.clients = clients);
  }

  saveClient(): void {
    this.clientsService.saveClient(this.model).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      },
      complete: () => {
        this.getClients();
      }
    });
  }

  deleteClient(client: ClientModel): void {
    this.clientsService.deleteClient(client.id).subscribe({
      error: (error) => {
        this.messageService.add(error.error);
      },
      complete: () => {
        this.getClients();
      }
    });
  }

  editClient(client: ClientModel): void {
    this.clientToEdit = Object.assign({}, client);
    this.showUpdateClient = true;
  }

  updateClient(): void {
    this.showUpdateClient = false;
    this.clientsService.editClient(this.clientToEdit, this.clientToEdit.id)
      .subscribe({
        error: (error) => {
          this.messageService.add(error.error);
        },
        complete: () => {
          this.getClients();
        }
      });
  }

  viewPassword(edit: boolean): void {
    if (!edit)
      this.typeButtonPassword = this.typeButtonPassword === 'password' ? 'text' : 'password';
    else
      this.typeEditButtonPassword = this.typeEditButtonPassword === 'password' ? 'text' : 'password';
  }

  get model(): any {
    return this._model;
  }

  set model(value: any) {
    this._model = value;
  }

  get clientToEdit(): ClientModel {
    return this._clientToEdit;
  }

  set clientToEdit(value: ClientModel) {
    this._clientToEdit = value;
  }

}
