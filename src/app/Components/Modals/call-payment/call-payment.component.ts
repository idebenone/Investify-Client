import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/Services/payment.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-call-payment',
  templateUrl: './call-payment.component.html',
  styleUrls: ['./call-payment.component.css']
})
export class CallPaymentComponent {

  cardNum = { first: '', sec: '', thir: '', fo: '' };
  exp_date = { mm: '', yy: '' };

  credObj: { [key: string]: FormControl } = {
    holder_name: new FormControl('', [Validators.required]),
    card_number: new FormControl(''),
    exp_date: new FormControl(''),
    cvv: new FormControl('', [Validators.required]),
    amount: new FormControl('', [Validators.required]),
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private paymentService: PaymentService,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<CallPaymentComponent>) { }

  ngOnInit() {

  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('pattern')) {
      return 'Not a valid name';
    }
    return '';
  }

  hasFormErrors() {
    return Object.values(this.credObj).some(control => control.invalid || control.pending);
  }

  onDigitInput(event: KeyboardEvent) {
    const input = event.target as HTMLInputElement;
    const maxLength = parseInt(input.getAttribute('maxlength') || '0', 10);

    if (input.value.length >= maxLength) {
      const inputs = Array.from(document.querySelectorAll('input.one'));
      const currentIndex = inputs.findIndex(inp => inp === input);

      if (event.key !== 'Backspace' && currentIndex < inputs.length - 1) {
        (inputs[currentIndex + 1] as HTMLInputElement).focus();
      }
    }
  }

  initValidation() {
    const newCredObj = {
      holder_name: this.credObj['holder_name'].value,
      card_number: this.cardNum.first + " " + this.cardNum.sec + " " + this.cardNum.thir + " " + this.cardNum.fo,
      exp_date: this.exp_date.mm + '/' + this.exp_date.yy,
      cvv: this.credObj['cvv'].value
    }
    this.paymentService.initValidation(newCredObj).subscribe((data: any) => {
      if (data) {
        this.initTrans();
      }
    })
  }

  initTrans() {
    const newTransObj = {
      user_id: this.data.user_id,
      camp_id: this.data.camp_id,
      amount: this.credObj['amount'].value
    }

    this.paymentService.initTrans(newTransObj).subscribe((data: any) => {
      this.snack.open('The Payment was successful', 'OK', { duration: 4000 });
      this.dialogRef.close();
    })
    console.log(newTransObj);
  }
}
