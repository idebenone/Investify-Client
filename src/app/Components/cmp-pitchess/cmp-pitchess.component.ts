import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CompanyService } from 'src/app/Services/company.service';
import { PitchService } from 'src/app/Services/pitch.service';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertPitchComponent } from '../Modals/insert-pitch/insert-pitch.component';
import { UpdatePitchComponent } from '../Modals/update-pitch/update-pitch.component';
import { Router } from '@angular/router';

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

  pitches: any = [];

  constructor(private pitchService: PitchService,
    private userService: UserService,
    private companyService: CompanyService,
    private snack: MatSnackBar,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.getUserById();
  }

  navigateByUrl(route: any) {
    this.router.navigateByUrl(route);
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.pitchObj['cmp_id'].setValue(data.id);
      if (data.length != 0)
        this.pitchService.getAllPitchByCmpId(data.id).subscribe((data: any) => {
          this.pitches = data;
        })
    })
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required'))
      return 'You must enter a value';
    if (control.hasError('pattern'))
      return 'Not a valid name';
    return '';
  }

  hasFormErrors() {
    return Object.values(this.pitchObj).some(control => control.invalid || control.pending);
  }

  deletePitch(id: any) {
    this.pitchService.deletePitch(id).subscribe((data: any) => {
      this.snack.open("Deleted Successfully", "OK", { duration: 4000 });
      this.ngOnInit();
    })
  }

  addPitch() {
    const dialogRef = this.dialog.open(InsertPitchComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  updatePitch(id: any) {
    const dialogRef = this.dialog.open(UpdatePitchComponent, {
      data: { id: id }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
