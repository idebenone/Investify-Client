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
      feature_vid: this.pitchObj['feature_vid'].value,
      deck: this.pitchObj['deck'].value
    }

    this.pitchService.createPitch(newPitchObj).subscribe((data) => {
      this.snack.open('Created Successfully', 'OK', { duration: 4000 });
      this.ngOnInit();
    })
  }

}
