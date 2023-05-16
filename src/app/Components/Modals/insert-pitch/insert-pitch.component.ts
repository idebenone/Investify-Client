import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PitchService } from 'src/app/Services/pitch.service';
import { UserService } from 'src/app/Services/user.service';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-insert-pitch',
  templateUrl: './insert-pitch.component.html',
  styleUrls: ['./insert-pitch.component.css']
})
export class InsertPitchComponent {

  pitchObj: { [key: string]: FormControl } = {
    pitch_id: new FormControl(''),
    cmp_id: new FormControl(''),
    pitch_title: new FormControl('', [Validators.required]),
    pitch_desc: new FormControl('', [Validators.required]),
    feature_img: new FormControl(''),
    feature_vid: new FormControl('', [Validators.required]),
    deck: new FormControl('', [Validators.required])
  }

  selectedFiles: File[] = [];
  imgUrl: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<InsertPitchComponent>,
    private pitchService: PitchService,
    private snack: MatSnackBar,
    private userService: UserService,
    private companyService: CompanyService) { }


  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.pitchObj['cmp_id'].setValue(data.id);
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
    return Object.values(this.pitchObj).some(control => control.invalid || control.pending);
  }

  addPitch() {
    const newPitchObj = {
      cmp_id: this.pitchObj['cmp_id'].value,
      pitch_title: this.pitchObj['pitch_title'].value,
      pitch_desc: this.pitchObj['pitch_desc'].value,
      feature_img: this.imgUrl,
      feature_vid: this.pitchObj['feature_vid'].value,
      deck: this.pitchObj['deck'].value
    }
    console.log(newPitchObj);
    this.pitchService.createPitch(newPitchObj).subscribe((data) => {
      this.snack.open("Successfully Added Pitch", 'OK', { duration: 4000 });
      this.dialogRef.close()
    })
  }

  onFileSelected(event: any) {
    this.selectedFiles = event.target.files;
    const formData = new FormData();
    for (const file of this.selectedFiles) {
      formData.append('files', file, file.name);
    }
    this.companyService.updateProfImage(formData).subscribe((data: any) => {
      this.imgUrl = data.image_url;
    })
  }
}
