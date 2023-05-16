import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/Services/campaign.service';

@Component({
  selector: 'app-allcamps',
  templateUrl: './allcamps.component.html',
  styleUrls: ['./allcamps.component.css']
})
export class AllcampsComponent {

  campaigns: any = [];

  constructor(private campaignService: CampaignService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPublicCamps();
  }

  getAllPublicCamps() {
    this.campaignService.getAllPublicCamps().subscribe((data: any) => {
      this.campaigns = data;
      console.log(data);
    })
  }

  raisePerc(raiseAmt: any, total_target: any) {
    return Math.floor(raiseAmt / total_target * 100);
  }

  covertToDate(date: any) {
    return new Date(date);
  }

  timeDiff(date1: any, date2: any) {
    return Math.ceil((date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
  }

  viewCamp(id: any) {
    this.router.navigateByUrl(`/campaigns/${id}`);
  }
}
