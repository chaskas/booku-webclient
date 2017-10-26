import { Injectable } from '@angular/core';

import { ActivatedRoute, Params } from '@angular/router';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { PTypeService } from '../../../services/ptype.service';

import { PType } from '../../../model/ptype';


@Injectable()
export class PTypesDatabase {

  dataChange: BehaviorSubject<PType[]> = new BehaviorSubject<PType[]>([]);
  get data(): PType[] { return this.dataChange.value; }

  constructor(private route: ActivatedRoute, private ptypeService: PTypeService) {
    this.initialize();
  }

  setPTypes(ptypes: PType[]){
    this.data.splice(0);
    for (let i = 0; i < ptypes.length; i++) { this.addPType(ptypes[i]); }
  }

  initialize(){

    this.ptypeService.getPTypes().then(ptypes => this.setPTypes(ptypes));

  }

  addPType(ptype: PType) {
    const copiedData = this.data.slice();
    copiedData.push(ptype);
    this.dataChange.next(copiedData);
  }

}
