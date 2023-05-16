import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  emailObj = { email: '' };

  otp: string[] = ['', '', '', '', '', ''];
  otpObj = { otp: '' };

  pass = { pass: '', cfpass: '' };
  passObj = { email: '', password: '' };

  pageNum = 1;

  constructor(private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router
  ) { }

  ngOnInit() {
    this.setPageNum(this.pageNum);
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/");
    }
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    this.focusFirstInput();
  }

  private focusFirstInput() {
    const firstInput = this.otpInputs.first.nativeElement as HTMLInputElement;
    firstInput.focus();
  }

  onInputChange(index: number) {
    const input = this.otpInputs.toArray()[index].nativeElement as HTMLInputElement;
    const value = input.value;
    if (value.length === 1) {
      if (index < this.otp.length - 1) {
        const nextInput = this.otpInputs.toArray()[index + 1].nativeElement as HTMLInputElement;
        nextInput.focus();
      }
    }
  }

  isOtpIncomplete(): boolean {
    return this.otp.some(value => value === '');
  }


  setPageNum(page: any) {
    if (this.pageNum !== page) {
      this.pageNum = page;
    }
  };

  isSetPageNum(page: any) {
    if (this.pageNum == page) {
      return true;
    } else {
      return false;
    }
  };

  initReg() {
    this.authService.initiateReg(this.emailObj).subscribe(() => { })
  }

  submitOtp() {
    const otpValue = this.otp.join('');
    this.otpObj.otp = otpValue;
    this.authService.verifyReg(this.otpObj).subscribe((data: any) => {
      if (data) {
        this.snack.open(`OTP verified successfully`, 'OK', { duration: 4000 })
        this.setPageNum(2);
      }
      this.snack.open(`Fetched All Subscribers`, 'OK', { duration: 4000 })
    })
  }

  submitPass() {
    if (this.pass.pass === this.pass.cfpass) {
      this.passObj.email = this.emailObj.email;
      this.passObj.password = this.pass.pass;
      this.authService.setPass(this.passObj).subscribe((data: any) => {
        localStorage.setItem("token", data.token);
        this.snack.open(`Logging in...`, 'OK', { duration: 4000 })
        this.ngOnInit();
      })
    }
  }
}
