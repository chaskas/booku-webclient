import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Params }   from '@angular/router';

import { PTypeService } from '../../../services/ptype.service';
import { PType } from '../../../model/ptype';
import { DialogsServiceService } from '../../../services/dialogs-service.service';

import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { CustomValidators } from 'ng2-validation';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ptype-edit',
  templateUrl: './ptype-edit.component.html',
  styleUrls: ['./ptype-edit.component.css']
})
export class PtypeEditComponent implements OnInit {

  ptypeForm: FormGroup;
  ptype: PType;
  @Input() errors: string[];
  @Input() success: string;

  constructor(
      private dialogsService: DialogsServiceService,
      private ptypeService: PTypeService,
	  private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      public snackBar: MdSnackBar,
      private _router: Router
  	) { }

ngOnInit() {
	this.createForm();

    this.route.params
      .switchMap((params: Params) => this.ptypeService.getPType(+params['id']))
      .subscribe(ptype => this._handleGetPlaceSuccess(ptype));
  }


  public openDialog() {
    this.dialogsService
      .confirm('Confirmar', '¿Seguro que quiere eliminar?')
      .subscribe(res => this.deletePType(res));
  }


	private createForm()
	{
    this.ptypeForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      plural: ['', [Validators.required]]
    });
	}

  private _handleGetPlaceSuccess(ptype: PType)
  {
    this.ptype = ptype;

    this.ptypeForm.setValue({
      name: ptype.name,
      plural: ptype.plural

    });
  }

  updatePType()
  {
  	this.ptypeService.updatePType(this.ptype.id, this.ptypeForm.value).then(
  		res => this._handleUpdateSuccess(res),
  		error => this._handleError(error)
  	);
  }

  deletePType(res: boolean): void
  {
    if(res) {
      this.ptypeService.deletePType(this.ptype.id).then((data) => {
        this._router.navigate(['ptype/edit']);
      });
    }
  }

   private _handleUpdateSuccess(data: any) {
    this.errors = null;
    this.snackBar.open("Tipo Espacio actualizado correctamente", undefined, {
      duration: 2000,
    });
    this._router.navigate(['/ptype/list']);
  }

  private _handleError(error: any) {
      this.errors = error.json().errors.full_messages;
  } 
}