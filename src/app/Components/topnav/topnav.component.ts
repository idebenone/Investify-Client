import { Component } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-topnav',
  templateUrl: './topnav.component.html',
  styleUrls: ['./topnav.component.css']
})
export class TopnavComponent {

  constructor(private authService: AuthService) { }
  is_loggedIn = 0;

  ngOnInit() {
    if (this.authService.getTokenFromStorage()) {
      this.is_loggedIn = 1;
    }
  }
}
