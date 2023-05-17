import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent {

  profObj: { [key: string]: FormControl } = {
    id: new FormControl(''),
    full_name: new FormControl('', [Validators.required]),
    email: new FormControl(''),
    password: new FormControl(''),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^(\+\d{1,3}\s?)?(\(\d{1,3}\)\s?)?\d{10}$/)]),
    bio: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    zip: new FormControl('', [Validators.required]),
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<ProfileComponent>,
    private userService: UserService,
    private snack: MatSnackBar) { }

  ngOnInit() {
    this.getUserById();
  }

  getUserById() {
    this.userService.getUserById(localStorage.getItem("email")).subscribe((data: any) => {
      console.log(data);
      if (data.length !== 0) {
        for (let key in data) {
          if (data.hasOwnProperty(key)) {
            const value = data[key];
            this.profObj[key].setValue(value);
          }
        }
      }
    })
  }

  getErrorMessage(control: FormControl) {
    if (control.hasError('required')) {
      return 'You must enter a value';
    }

    if (control.hasError('pattern')) {
      return 'Oops! Not a valid format';
    }
    return '';
  }

  hasFormErrors() {
    return Object.values(this.profObj).some(control => control.invalid || control.pending);
  }

  update() {
    const newProfObj = {
      id: this.profObj['id'].value,
      full_name: this.profObj['full_name'].value,
      email: this.profObj['email'].value,
      phone: this.profObj['phone'].value,
      bio: this.profObj['bio'].value,
      city: this.profObj['city'].value,
      state: this.profObj['state'].value,
      zip: this.profObj['zip'].value,
    }


    this.userService.updateUser(newProfObj).subscribe((data: any) => {
      this.snack.open("User updated", "OK", { duration: 4000 });
      this.dialogRef.close();
    })
  }


}
