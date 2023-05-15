import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/Services/company.service';
import { PitchService } from 'src/app/Services/pitch.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-cmp-pitchess',
  templateUrl: './cmp-pitchess.component.html',
  styleUrls: ['./cmp-pitchess.component.css']
})
export class CmpPitchessComponent {

  pitchObj: { [key: string]: FormControl } = {
    pitch_id: new FormControl(''),
    cmp_id: new FormControl(''),
    pitch_title: new FormControl('', [Validators.required]),
    pitch_desc: new FormControl('', [Validators.required]),
    feature_img: new FormControl(''),
    feature_vid: new FormControl('', [Validators.required]),
    deck: new FormControl('', [Validators.required])
  }

  userID: any;
  pitches: any = [];

  constructor(private pitchService: PitchService,
    private userService: UserService,
    private companyService: CompanyService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.userID = data.id;
      if (data.length != 0)
        this.pitchService.getAllPitchByCmpId(data.id).subscribe((data: any) => {
          this.pitches = data;
        })
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
      cmp_id: this.userID,
      pitch_title: this.pitchObj['pitch_title'].value,
      pitch_desc: this.pitchObj['pitch_desc'].value,
      feature_vid: this.pitchObj['feature_vid'].value,
      deck: this.pitchObj['deck'].value
    }

    this.pitchService.createPitch(newPitchObj).subscribe((data) => {
      this.snack.open('Created Successfully', 'OK', { duration: 4000 });
      this.ngOnInit();
    })
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
      cmp_id: this.userID,
      pitch_title: this.pitchObj['pitch_title'].value,
      pitch_desc: this.pitchObj['pitch_desc'].value,
      feature_vid: this.pitchObj['feature_vid'].value,
      deck: this.pitchObj['deck'].value
    }

    this.pitchService.updatePitch(updatePitchObj).subscribe((data: any) => {
      this.snack.open('Updated Successfully', 'OK', { duration: 4000 });
      this.ngOnInit();
    })

  }

  deletePitch(id: any) {
    this.pitchService.deletePitch(id).subscribe((data: any) => {
      this.snack.open("Deleted Successfully", "OK", { duration: 4000 });
      this.ngOnInit();
    })
  }

}
