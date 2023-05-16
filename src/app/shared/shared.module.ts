import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TopnavComponent } from '../Components/topnav/topnav.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog'
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { CompanyComponent } from '../Components/company/company.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Guard/auth.interceptor';
import { AuthService } from '../Services/auth.service';
import { CompanyService } from '../Services/company.service';
import { CmpPitchessComponent } from '../Components/cmp-pitchess/cmp-pitchess.component';
import { CmpCampsComponent } from '../Components/cmp-camps/cmp-camps.component';
import { InsertCampComponent } from '../Components/Modals/insert-camp/insert-camp.component';
import { InsertPitchComponent } from '../Components/Modals/insert-pitch/insert-pitch.component';
import { UpdatePitchComponent } from '../Components/Modals/update-pitch/update-pitch.component';
import { UpdateCampComponent } from '../Components/Modals/update-camp/update-camp.component';



@NgModule({
  declarations: [
    SharedComponent,
    TopnavComponent,
    CompanyComponent,
    ProfileComponent,
    CmpPitchessComponent,
    CmpCampsComponent,
    InsertCampComponent,
    InsertPitchComponent,
    UpdatePitchComponent,
    UpdateCampComponent

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatDialogModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    CompanyService
  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
