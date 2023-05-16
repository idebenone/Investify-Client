import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {

  constructor(private authService: AuthService,
    private router: Router) { }
  is_loggedIn = 0;

  ngOnInit() {
    if (this.authService.isTokenExist()) {
      this.is_loggedIn = 1;
    }
  }

  logout() {
    if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      this.router.navigateByUrl("/login");
    }
  }
}
