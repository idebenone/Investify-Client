import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { SharedComponent } from './shared.component';
import { TopnavComponent } from '../Components/topnav/topnav.component';


import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CompanyComponent } from '../Components/company/company.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../Guard/auth.interceptor';
import { AuthService } from '../Services/auth.service';
import { CompanyService } from '../Services/company.service';
import { CmpPitchessComponent } from '../Components/cmp-pitchess/cmp-pitchess.component';
import { CmpCampsComponent } from '../Components/cmp-camps/cmp-camps.component';


@NgModule({
  declarations: [
    SharedComponent,
    TopnavComponent,
    CompanyComponent,
    ProfileComponent,
    CmpPitchessComponent,
    CmpCampsComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
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
