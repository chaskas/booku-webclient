import { Component, OnInit, Inject, Input } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatDialogRef, MatSnackBarConfig } from '@angular/material';

import { PaymentService } from '../../../services/payment.service';

import { Booking } from '../../../model/booking';
import { Payment } from '../../../model/payment';

@Component({
  selector: 'app-payment-new',
  templateUrl: './payment-new.component.html',
  styleUrls: ['./payment-new.component.css']
})
export class PaymentNewComponent implements OnInit {

  payment: Payment;
  paymentForm: FormGroup;
  @Input() errors: string[];
  @Input() success: string;

  allowPayments: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<PaymentNewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar,
    private paymentService: PaymentService,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {

  }

  private createForm()
  {
    this.paymentForm = this.formBuilder.group({
      amount: ['', [Validators.required]],
      method: ['', [Validators.required]],
      bill: ['', [Validators.required]],
      booking_id: [this.data.booking.id, [Validators.required]]
    });
  }

  createPayment()
  {
    if(this.allowPayments){
      this.allowPayments = false;
      this.paymentService.createPayment(this.paymentForm.value).then(
        res =>      this.handleCreateSuccess(res),
        error =>    this.handleError(error)
      );
    } else {
      console.log("ROJO");
    }
  }

  private handleCreateSuccess(data: any) {
    this.allowPayments = true;
	  this.errors = null;
    this.snackBar.open("Pago Registrado correctamente", "OK", {
      duration: 2000,
	  });

    this.dialogRef.close();

  }

  private handleError(error: any) {
      this.snackBar.open(error.json(), null, {
        duration: 2000,
      });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
