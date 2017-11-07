import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { StatusService } from '../../../services/status.service';

import { Status } from '../../../model/status';


@Injectable()
export class StatusesDatabase {

  dataChange: BehaviorSubject<Status[]> = new BehaviorSubject<Status[]>([]);
  get data(): Status[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private statusService: StatusService) {
    this.initialize();
  }

  setStatus(status: Status[]){
    this.data.splice(0);
    for (let i = 0; i < status.length; i++) { this.addStatus(status[i]); }
  }

  initialize(){

    this.statusService.getStatuses().then(status => this.setStatus(status));

  }

  addStatus(status: Status) {
    const copiedData = this.data.slice();
    copiedData.push(status);
    this.dataChange.next(copiedData);
  }

}
