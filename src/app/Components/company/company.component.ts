import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/Services/company.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent {

  //new profile 
  compObj: { [key: string]: FormControl } = {
    cmp_id: new FormControl('', [Validators.required]),
    cmp_name: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
    prf_img: new FormControl('', [Validators.required]),
    pan: new FormControl('', [Validators.required]),
    bio: new FormControl('', [Validators.required]),
    address: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    media_link1: new FormControl('', [Validators.required]),
    media_link2: new FormControl('', [Validators.required]),
    media_link3: new FormControl('', [Validators.required]),
    pitch: new FormControl([])
  }

  profLen: boolean = false;
  selectedFiles: File[] = [];
  imgUrl: any;
  userID: any;

  constructor(private companyService: CompanyService,
    private userService: UserService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getUserById();

  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.userID = data.id;
      if (data.length != 0)
        this.getCompProfById(data.id); //check
    })
  }

  getCompProfById(id: any) {
    this.companyService.getCompById(id).subscribe((data: any) => {
      if (data.length === 0 || null) {
        this.profLen = false;
      } else {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            this.compObj[key].setValue(value);
          }
        }
        this.imgUrl = this.compObj['prf_img'].value;
        this.profLen = true;
      }

    })

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
    const compObjFin = {
      cmp_id: this.userID,
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

    this.companyService.createCompProf(compObjFin).subscribe(() => {
      this.snack.open('Created Successfully', 'OK', { duration: 4000 })
      this.ngOnInit();
    })

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
