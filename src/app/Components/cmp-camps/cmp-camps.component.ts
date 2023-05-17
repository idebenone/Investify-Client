import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertCampComponent } from '../Modals/insert-camp/insert-camp.component';
import { CampaignService } from 'src/app/Services/campaign.service';
import { UpdateCampComponent } from '../Modals/update-camp/update-camp.component';
import { Router } from '@angular/router';
import { CompanyProfileComponent } from '../Modals/company-profile/company-profile.component';
import { CreateCompProfileComponent } from '../Modals/create-comp-profile/create-comp-profile.component';
import { CompanyService } from 'src/app/Services/company.service';

@Component({
  selector: 'app-cmp-camps',
  templateUrl: './cmp-camps.component.html',
  styleUrls: ['./cmp-camps.component.css']
})
export class CmpCampsComponent {

  campaigns: any = [];
  userID: any;
  comTru = false;

  constructor(private userService: UserService,
    private campaignService: CampaignService,
    private companyService: CompanyService,
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
      if (data.length != 0) {
        this.companyService.getCompById(data.id).subscribe((data: any) => {
          if (data.length != 0) {
            this.comTru = true;
          }
        })
        this.campaignService.getAllCampByCmpId(data.id).subscribe((data: any) => {
          this.campaigns = data;
        })
      }
    })
  }


  insertCamp() {
    const dialogRef = this.dialog.open(InsertCampComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.ngOnInit();
    });
  }

  updateCamp(id: any) {
    const dialogRef = this.dialog.open(UpdateCampComponent, {
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

