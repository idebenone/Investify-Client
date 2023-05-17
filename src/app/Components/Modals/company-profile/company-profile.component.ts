import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent {

  //new profile 
  compObj: { [key: string]: FormControl } = {
    cmp_id: new FormControl(''),
    cmp_name: new FormControl('', [Validators.required]),
    prf_img: new FormControl(''),
    pan: new FormControl('', [Validators.required, Validators.pattern(/^[A-Z]{2}[A-Z]{1}[A-Z0-9]{1}[A-Z0-9]{1}[0-9]{2}[0-9]{2}[A-Z]{1}$/)]),
    bio: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    media_link1: new FormControl('', [Validators.required]),
    media_link2: new FormControl('', [Validators.required]),
    media_link3: new FormControl('', [Validators.required]),
    pitch: new FormControl('')
  }

  selectedFiles: File[] = [];
  imgUrl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CompanyProfileComponent>,
    private companyService: CompanyService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getCompProfById(this.data.user_id);

  }

  getCompProfById(id: any) {
    this.companyService.getCompById(id).subscribe((data: any) => {
      console.log(data);
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          this.compObj[key].setValue(value);
        }
      }
      this.imgUrl = this.compObj['prf_img'].value;

    })

  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('pattern')) {
      return 'Oops! Not a valid format';
    }
    return '';
  }

  hasFormErrors() {
    return Object.values(this.compObj).some(control => control.invalid || control.pending);
  }

  update() {
    const compObjFin = {
      cmp_id: this.compObj['cmp_id'].value,
      cmp_name: this.compObj['cmp_name'].value,
      prf_img: this.imgUrl,
      pan: this.compObj['pan'].value,
      bio: this.compObj['bio'].value,
      address: this.compObj['address'].value,
      city: this.compObj['city'].value,
      state: this.compObj['state'].value,
      media_link1: this.compObj['media_link1'].value,
      media_link2: this.compObj['media_link2'].value,
      media_link3: this.compObj['media_link3'].value
    }
    this.companyService.updateComProf(compObjFin).subscribe(() => {
      this.snack.open('Updated Successfully', 'OK', { duration: 4000 })
      this.dialogRef.close();
    })
  }

  onFileSelected(event: any) {

    this.selectedFiles = event.target.files;
    const formData = new FormData();

    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }

    this.companyService.updateProfImage(formData).subscribe((data: any) => {
      console.log(data);
      this.imgUrl = data.image_url;
    })
  }
}
