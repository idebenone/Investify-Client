import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Guard/login/login.component';
import { RegisterComponent } from './Guard/register/register.component';
import { ForgetpassComponent } from './Guard/forgetpass/forgetpass.component';

const routes: Routes = [
  { path: "login", component: LoginComponent },
  { path: "register", component: RegisterComponent },
  { path: "forgetpass", component: ForgetpassComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
