import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  logObj: { [key: string]: FormControl } = {
    email: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)])
  }

  constructor(private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.authService.isTokenExist() ? this.router.navigateByUrl("/") : null;
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required'))
      return 'You must enter a value';
    if (control.hasError('pattern'))
      return 'Value is invalid';
    if (control.hasError('email'))
      return 'Not a valid email';
    return '';
  }

  hasFormErrors() {
    return Object.values(this.logObj).some(control => control.invalid || control.pending);
  }

  submit() {
    const loginForm = {
      email: this.logObj['email'].value,
      password: this.logObj['password'].value
    };

    this.authService.login(loginForm).subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      localStorage.setItem("email", data.email);
      this.snack.open('Login Successful', 'OK', { duration: 4000 });
      this.ngOnInit();
    })
  }
}
