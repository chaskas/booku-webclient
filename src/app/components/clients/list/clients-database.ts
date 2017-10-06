import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { ClientService } from '../../../services/client.service';

import { Client } from '../../../model/client';


@Injectable()
export class ClientsDatabase {

  dataChange: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  get data(): Client[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private clientService: ClientService) {
    this.initialize();
  }

  setClients(clients: Client[]){
    this.data.splice(0);
    for (let i = 0; i < clients.length; i++) { this.addClient(clients[i]); }
  }

  initialize(){

    this.clientService.getClients().then(clients => this.setClients(clients));

  }

  addClient(client: Client) {
    const copiedData = this.data.slice();
    copiedData.push(client);
    this.dataChange.next(copiedData);
  }

}
