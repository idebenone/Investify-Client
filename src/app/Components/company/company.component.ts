import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  compObj = {
    name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    pan: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    media_link1: new FormControl('', [Validators.required]),
    media_link2: new FormControl('', [Validators.required]),
    media_link3: new FormControl('', [Validators.required]),
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
    return Object.values(this.compObj).some(control => control.invalid || control.pending);
  }

  submit() {
    console.log(this.compObj);
  }
}
