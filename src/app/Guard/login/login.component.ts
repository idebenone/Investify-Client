import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = { email: '', password: '' };

  constructor(private authService: AuthService,
    private router: Router,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.authService.getTokenFromStorage() ? this.router.navigateByUrl("/") : null;
  }

  submit() {
    this.authService.login(this.loginForm).subscribe((data: any) => {
      localStorage.setItem("token", data.token);
      this.snack.open('Login Successful', 'OK', { duration: 4000 });
      this.ngOnInit();
    })
  }
}
