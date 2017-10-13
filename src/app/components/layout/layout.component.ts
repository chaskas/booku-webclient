import { Component, OnInit } from '@angular/core';

import { PType } from '../../model/ptype';

import { PTypeService } from '../../services/ptype.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  ptypes: PType[];

  constructor(private ptypeService: PTypeService) {
    this.ptypeService.getPTypes().then(ptypes => this.handleGetPtypesSuccess(ptypes));
  }

  ngOnInit() {
  }

  handleGetPtypesSuccess(ptypes: PType[]){
    this.ptypes = ptypes;
  }

}
