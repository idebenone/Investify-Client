import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { MatDialog } from '@angular/material/dialog';
import { InsertCampComponent } from '../Modals/insert-camp/insert-camp.component';
import { CampaignService } from 'src/app/Services/campaign.service';
import { UpdateCampComponent } from '../Modals/update-camp/update-camp.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cmp-camps',
  templateUrl: './cmp-camps.component.html',
  styleUrls: ['./cmp-camps.component.css']
})
export class CmpCampsComponent {


  campaigns: any = [];

  constructor(private userService: UserService,
    private campaignService: CampaignService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit() {
    this.getUserById();
  }

  navigateByUrl(route: any) {
    this.router.navigateByUrl(route);
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

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      if (data.length != 0) {
        this.campaignService.getAllCampByCmpId(data.id).subscribe((data: any) => {
          this.campaigns = data;
        })
      }
    })
  }

}

