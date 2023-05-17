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
import { CreateCompProfileComponent } from '../Modals/create-comp-profile/create-comp-profile.component';
import { CompanyProfileComponent } from '../Modals/company-profile/company-profile.component';

@Component({
  selector: 'app-cmp-pitchess',
  templateUrl: './cmp-pitchess.component.html',
  styleUrls: ['./cmp-pitchess.component.css']
})
export class CmpPitchessComponent {


  pitches: any = [];
  userID: any;
  comTru = false;

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
      this.userID = data.id;
      if (data.length != 0)
        this.companyService.getCompById(data.id).subscribe((data: any) => {
          if (data.length != 0) {
            this.comTru = true;
          }
        })
      this.pitchService.getAllPitchByCmpId(data.id).subscribe((data: any) => {
        this.pitches = data;
      })
    })
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

  addCompany() {
    const dialogRef = this.dialog.open(CreateCompProfileComponent, {
      data: { user_id: this.userID }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  getCompany() {
    const dialogRef = this.dialog.open(CompanyProfileComponent, {
      data: { user_id: this.userID }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

}
