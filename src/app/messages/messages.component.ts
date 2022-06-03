import { Component, OnInit } from '@angular/core';
import {AlertService} from "../services/alert/alert.service";

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor(public messageService: AlertService) { }

  ngOnInit(): void {
  }

}
