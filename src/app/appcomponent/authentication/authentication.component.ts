import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { DashboardComponent } from '../dashboard/dashboard.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {

  usercredential: any = {};

  constructor(private route: Router) { }

  ngOnInit() {
  }

  onLogin() {


    const enteredUserName = this.usercredential.username;
    const enteredUserPasskey = this.usercredential.passkey;
    if (enteredUserName === '' || enteredUserName === undefined) {
      Swal.fire({
        title: 'Required',
        text: 'E-mail address is required to Sign In',
        type: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (enteredUserPasskey === '' || enteredUserPasskey === undefined) {
      Swal.fire({
        title: 'Required',
        text: 'Please enter a password to Sign In',
        type: 'info',
        confirmButtonText: 'Ok'
      });
      return;
    }
    if (enteredUserName.toLowerCase() === 'admin' && enteredUserPasskey.toLowerCase() === 'pass') {
      console.log('authentication successful');
      this.route.navigate(['/dashboard']);
    } else {
      Swal.fire({
        title: 'Invalid',
        text: 'User not found',
        type: 'error',
        confirmButtonText: 'Ok'
      });
    }
  }

  signupButtonClicked(evt: Event) {
    console.log('signupButtonClicked');
    this.route.navigate(['/signup']);
  }

  forgetPasswordClicked(evt: Event) {
    Swal.fire({
      title: 'Forgot Password',
      input: 'email',
      inputAttributes: {
        autocapitalize: 'off'
      },
      text: 'Please provide your Email Id to reset password.',
      inputPlaceholder: 'Email Address',
      type: 'info',
      confirmButtonText: 'Submit'
    }).then((willDelete) => {

      if (willDelete.value) {
        Swal.fire('Success');
      } else {
        Swal.fire('Fail');
      }

  });
  }

}
