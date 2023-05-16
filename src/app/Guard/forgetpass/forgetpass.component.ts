import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Services/auth.service';

@Component({
  selector: 'app-forgetpass',
  templateUrl: './forgetpass.component.html',
  styleUrls: ['./forgetpass.component.css']
})
export class ForgetpassComponent implements AfterViewInit {

  emailObj = { email: '' };

  otp: string[] = ['', '', '', '', '', ''];
  otpObj = { otp: '' };

  pass = { pass: '', cfpass: '' };
  passObj = { email: '', password: '' };

  pageNum = 1;

  constructor(private authService: AuthService,
    private snack: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.setPageNum(this.pageNum);
    if (localStorage.getItem("token")) {
      this.router.navigateByUrl("/");
    }
  }

  @ViewChildren('otpInput') otpInputs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    if (this.otpInputs && this.otpInputs.length > 0) {
      this.focusFirstInput();
    }
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
        nextInput.select(); // Select the content of the next input field
      } else {
        input.blur(); // Remove focus from the current input field
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

  forgetPass() {
    this.authService.forgetPass(this.emailObj).subscribe(() => {
    })
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


