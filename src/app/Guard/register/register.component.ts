import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { AuthService } from 'src/app/Services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements AfterViewInit {

  emailObj: { [key: string]: FormControl } = {
    email: new FormControl('', [Validators.email, Validators.required])
  };

  otp: string[] = ['', '', '', '', '', ''];
  otpObj = { otp: '' };

  checkPassObj: { [key: string]: FormControl } = {
    pass: new FormControl('', [Validators.required, Validators.minLength(6)]),
    cfpass: new FormControl('', [Validators.required, Validators.minLength(6)])
  }

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
    return Object.values(this.emailObj).some(control => control.invalid || control.pending);
  }

  hasFormErrors1() {
    return Object.values(this.checkPassObj).some(control => control.invalid || control.pending);
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
    const newEmailObj = {
      email: this.emailObj['email'].value
    }
    this.authService.initiateReg(newEmailObj).subscribe(() => {
      this.snack.open('Email has been sent', 'OK', { duration: 4000 });
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
    if (this.checkPassObj['pass'].value == this.checkPassObj['cfpass'].value) {
      this.passObj.email = this.emailObj['email'].value;
      this.passObj.password = this.checkPassObj['pass'].value;


      this.authService.setPass(this.passObj).subscribe((data: any) => {
        if (data) {
          localStorage.setItem("token", data.token);
          localStorage.setItem("email", data.email);
          this.snack.open(`Logging in...`, 'OK', { duration: 4000 })
          this.ngOnInit();
        } else {
          alert("NULL");
        }
      })
    }
  }
}
