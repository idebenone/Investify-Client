import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CampaignService } from 'src/app/Services/campaign.service';

interface YourObjectType {
  address: string;
  bio: string;
  campaignId: number;
  campaignTitle: string;
  city: string;
  companyId: number;
  companyName: string;
  deck: string;
  endDate: string;
  featureImage: string;
  featureVideo: string;
  isRaisedAmt: number;
  maxRaise: number;
  mediaLink1: string;
  mediaLink2: string;
  mediaLink3: string;
  minRaise: number;
  pan: string;
  pitchDescription: string;
  pitchId: number;
  profileImage: string;
  startDate: string;
  state: string;
  targetRaise: number;
}


@Component({
  selector: 'app-allcamps',
  templateUrl: './allcamps.component.html',
  styleUrls: ['./allcamps.component.css']
})
export class AllcampsComponent {

  lCampaigns: any = [];
  uCampaigns: any = [];
  pageNum: any;

  constructor(private campaignService: CampaignService,
    private router: Router) { }

  ngOnInit() {
    this.getAllPublicCamps();
    this.setPageNum(1);
  }

  setPageNum(page: any) {
    if (this.pageNum !== page) {
      this.pageNum = page;
    }
  };

  isSetPageNum(page: any) {
    if (this.pageNum == page) {
      return true;
    } else {
      return false;
    }
  };

  getAllPublicCamps() {
    this.campaignService.getAllPublicCamps().subscribe((data: any) => {

      const today = new Date();
      const todayYear = today.getFullYear();
      const todayMonth = today.getMonth();
      const todayDate = today.getDate();

      const liveCampaigns: YourObjectType[] = [];
      const upcomingCampaigns: YourObjectType[] = [];

      data.forEach((obj: YourObjectType) => {
        const startDate = new Date(obj.startDate);
        const startYear = startDate.getFullYear();
        const startMonth = startDate.getMonth();
        const startDateValue = startDate.getDate();

        if (
          startYear === todayYear &&
          startMonth === todayMonth &&
          startDateValue <= todayDate
        ) {
          liveCampaigns.push(obj);
        } else {
          upcomingCampaigns.push(obj);
        }
      });

      this.lCampaigns = liveCampaigns;
      this.uCampaigns = upcomingCampaigns;

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
