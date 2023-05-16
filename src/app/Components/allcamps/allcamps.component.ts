import { Component } from '@angular/core';
import { CampaignService } from 'src/app/Services/campaign.service';

@Component({
  selector: 'app-allcamps',
  templateUrl: './allcamps.component.html',
  styleUrls: ['./allcamps.component.css']
})
export class AllcampsComponent {

  constructor(private campaignService: CampaignService) { }

  ngOnInit() {
    this.getAllPublicCamps();
  }

  getAllPublicCamps() {
    this.campaignService.getAllPublicCamps().subscribe((data: any) => {
      console.log(data);
    })
  }
}
