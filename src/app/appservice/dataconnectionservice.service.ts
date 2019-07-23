import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


const endpoint = 'https://api.getAddress.io/find/';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})

export class DataconnectionserviceService {

  constructor(private httpService: HttpClient, private spinner: NgxSpinnerService) { }

  private extractData(res: Response) {
    const body = res;
    return body || { };
  }


  getProducts(arg): Observable<any> {

    const http$ = this.httpService.get(endpoint + '' + arg + '?api-key=aZYodp9kQEmABQaOfShfqQ19929&expand=true');
    http$
    .pipe(

      catchError(err => {
        console.log('caught mapping error and rethrowing', err);

        switch (err.status) {

          case 400:
            Swal.fire({
              title: err.statusText,
              text: 'It seems like an invalid postcode',
              type: 'error',
              confirmButtonText: 'Try Again'
            });
            break;

          case 404:
            Swal.fire({
              title: err.statusText,
              text: 'No result found.',
              type: 'error',
              confirmButtonText: 'Try Again'
            });
            break;

          default:
              Swal.fire({
                title: err.statusText,
                text: 'Something went wrong. Request you to try again.',
                type: 'error',
                confirmButtonText: 'Try Again'
              });
              break;


        }

        this.spinner.hide();
        return throwError(err);
      }),
    )
    .subscribe(
      res => console.log(' HTTP response ', res),
      err => console.log('HTTP Error', err),
      () => console.log('HTTP request completed.')
    );

    console.log(' this.extractData >>>  ' + http$);


    return http$.pipe(map(this.extractData));
  }
  errorHandler(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
}
