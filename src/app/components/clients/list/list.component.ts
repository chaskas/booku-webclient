import { Component, OnInit, Input } from '@angular/core';

import { ClientService } from '../../../services/client.service';
import { Client } from '../../../model/client';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  clients: Client[];
  @Input() errors: string[];

  constructor(
  	private clientService: ClientService

  	) { }

  ngOnInit() {
  	  this.clientService.getClients().then(
      clients => this.clients = clients,
      error => this._handleErrors(error)
    )
  }

  private _handleErrors(error: any)
  {
    this.errors = error.json().errors.full_messages;
  }


}
