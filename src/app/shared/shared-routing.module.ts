import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedComponent } from './shared.component';
import { HomeComponent } from '../Components/home/home.component';
import { AllcampsComponent } from '../Components/allcamps/allcamps.component';
import { CmpPitchessComponent } from '../Components/cmp-pitchess/cmp-pitchess.component';
import { CmpCampsComponent } from '../Components/cmp-camps/cmp-camps.component';
import { authGuard } from '../Guard/auth.guard';
import { ProfileComponent } from '../Components/profile/profile.component';
import { CompanyComponent } from '../Components/company/company.component';
import { IndiCampComponent } from '../Components/indi-camp/indi-camp.component';

const routes: Routes = [
  {
    path: "", component: SharedComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'campaigns', component: AllcampsComponent },
      { path: 'campaigns/:id', component: IndiCampComponent },
      { path: 'company/profile', component: CompanyComponent, canActivate: [authGuard] },
      { path: 'company/pitches', component: CmpPitchessComponent, canActivate: [authGuard] },
      { path: 'company/campaigns', component: CmpCampsComponent, canActivate: [authGuard] },
      { path: 'profile', component: ProfileComponent, canActivate: [authGuard] },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SharedRoutingModule { }
