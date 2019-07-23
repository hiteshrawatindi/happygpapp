import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    console.log(' userprofile ');
    /* Swal.fire({
        title: 'WIP',
        text: 'Userprofile tab in under construction.',
        type: 'info',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.value) {
          this.route.navigate(['/dashboard']);
        }
      }); */
  }

  appLogoutUser(evt: Event) {
    console.log('appLogoutUser Clicked');
    this.route.navigate(['/authentication']);
  }

}
