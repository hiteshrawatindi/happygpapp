import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inappnotifications',
  templateUrl: './inappnotifications.component.html',
  styleUrls: ['./inappnotifications.component.scss']
})
export class InappnotificationsComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
    console.log(' userprofile ');
    Swal.fire({
        title: 'WIP',
        text: 'Notifications tab in under construction.',
        type: 'info',
        confirmButtonText: 'OK'
      }).then((result) => {
        if (result.value) {
          this.route.navigate(['/dashboard']);
        }
      });
  }

}
