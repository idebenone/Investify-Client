import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PitchService } from 'src/app/Services/pitch.service';
import { Inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update-pitch',
  templateUrl: './update-pitch.component.html',
  styleUrls: ['./update-pitch.component.css']
})
export class UpdatePitchComponent {

  pitchObj: { [key: string]: FormControl } = {
    pitch_id: new FormControl(''),
    cmp_id: new FormControl(''),
    pitch_title: new FormControl('', [Validators.required]),
    pitch_desc: new FormControl('', [Validators.required]),
    feature_img: new FormControl(''),
    feature_vid: new FormControl('', [Validators.required]),
    deck: new FormControl('', [Validators.required])
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    private pitchService: PitchService,
    private snack: MatSnackBar,
    public dialogRef: MatDialogRef<UpdatePitchComponent>) { }

  ngOnInit() {
    this.getPitch(this.data.id);
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

  getPitch(id: any) {
    this.pitchService.getPitchById(id).subscribe((data: any) => {
      for (let key in data) {
        if (data.hasOwnProperty(key)) {
          const value = data[key];
          this.pitchObj[key].setValue(value);
        }
      }
    })
  }

  updatePitch() {
    const updatePitchObj = {
      pitch_id: this.pitchObj['pitch_id'].value,
      pitch_title: this.pitchObj['pitch_title'].value,
      pitch_desc: this.pitchObj['pitch_desc'].value,
      feature_vid: this.pitchObj['feature_vid'].value,
      deck: this.pitchObj['deck'].value
    }

    this.pitchService.updatePitch(updatePitchObj).subscribe((data: any) => {
      this.snack.open("Successfully Updated Pitch", 'OK', { duration: 4000 });
      this.dialogRef.close()
    })
  }



}
