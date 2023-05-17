import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent {

  investments: any = [];
  constructor(private userService: UserService) { }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      this.userService.getUserInv(data.id).subscribe((data: any) => {
        console.log(data);
        this.investments = data;
      })
    })
  }

}
