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

@NgModule({
  declarations: [
    SharedComponent,
    TopnavComponent,
    CompanyComponent,
    ProfileComponent,

  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule

  ],
  exports: [
    SharedComponent
  ]
})
export class SharedModule { }
