import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { CampaignService } from 'src/app/Services/campaign.service';
import { MatDialog } from '@angular/material/dialog';
import { CallPaymentComponent } from '../Modals/call-payment/call-payment.component';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-indi-camp',
  templateUrl: './indi-camp.component.html',
  styleUrls: ['./indi-camp.component.css']
})
export class IndiCampComponent {

  campaign: any;
  embeddedVideo: SafeHtml | undefined;

  userID: any
  campaign_id: any;

  constructor(private campaignService: CampaignService,
    private userService: UserService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getCampaignById(parseInt(params['id']));
      this.campaign_id = parseInt(params['id']);
    })
    this.getUser();
  }

  getUser() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.userID = data.id;
    })
  }

  getCampaignById(id: any) {
    this.campaignService.getCampByCampId(id).subscribe((data: any) => {
      this.campaign = data;
      this.embedVideo(data.featureVideo);
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


  embedVideo(link: any) {
    const videoId = this.extractVideoId(link);
    const embedCode = `<iframe class="w-100" height="400px" src="https://www.youtube.com/embed/${videoId}?controls=0&showinfo=0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
    this.embeddedVideo = this.sanitizer.bypassSecurityTrustHtml(embedCode);
  }

  private extractVideoId(url: string): string {
    const pattern = /(?:youtube\.com\/(?:[^/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=|[^#]*[?&]vi=)|youtu\.be\/)([^"&?/ ]{11})/;
    const match = url.match(pattern);
    if (match && match[1])
      return match[1];
    return '';
  }

  invest() {
    const dialogRef = this.dialog.open(CallPaymentComponent, {
      data: {
        user_id: this.userID,
        camp_id: this.campaign_id
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      window.location.reload();
    });
  }
}
