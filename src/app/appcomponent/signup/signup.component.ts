import { Component, OnInit, Inject, NgZone, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StepperSelectionEvent } from '@angular/cdk/stepper';
import { MatStepper } from '@angular/material/stepper';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

import { HttpClient } from '@angular/common/http';

import { DataconnectionserviceService } from '../../appservice/dataconnectionservice.service';

import { NgxSpinnerService } from 'ngx-spinner';
import Swal from 'sweetalert2';


export interface DialogData {
  userFormattedAddress: any;
}




@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: 'dialog-overview-example-dialog.html',
})
export class DialogOverviewExampleDialogComponent {

  userSelectedAddressDialog: string = 'Chosen address will appear here';
  public dialog: MatDialog;
  private route: Router;
  private formBuilder: FormBuilder;
  private httpClient: HttpClient;
  public httpService: DataconnectionserviceService;
  private spinner: NgxSpinnerService;


  constructor(
    public dialogRef: MatDialogRef<DialogOverviewExampleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private ngZone: NgZone, private changeDetector: ChangeDetectorRef) {}

  userAddressSelected(event: Event): void {

      const input = event.currentTarget as HTMLElement;
      this.dialogRef.close(input.textContent);
  }
}


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userRegistrationCredential: any = {};
  userRegisteredName = '';
  firstname = '';
  lastname = '';
  currentSectionInDisplay = 1;
  totalSections = 5;
  NHSMaxLength = 6;
  DOBMaxLength = 10;

  userPhoneNumberMaxLength: number = 10;
  userNHSNumberMaxLength: number = 6;




  userRegisteredGender = 'male';

  movingNext: boolean = false;

  minDate = new Date(1920, 0, 1);
  maxDate = new Date();

  userEnteredPostcode: string = '';


  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;

  addressData: any;
  userFormattedAddress: any = [];
  userSelectedAddress: string = 'Selected address will appear here';


// tslint:disable-next-line: max-line-length
  constructor(public dialog: MatDialog, private route: Router, private formBuilder: FormBuilder, private httpClient: HttpClient, public httpService: DataconnectionserviceService, private spinner: NgxSpinnerService) { }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      firstName: ['', Validators.required],
      middlename: [''],
      lastName: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      gender: ['0', Validators.required],
      DOB: ['', Validators.required],
      NHS: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(this.userNHSNumberMaxLength),
        Validators.minLength(this.userNHSNumberMaxLength)
      ])],
      userPhoneNumber: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(this.userPhoneNumberMaxLength),
        Validators.minLength(this.userPhoneNumberMaxLength)
      ])]
    });
    this.thirdFormGroup = this.formBuilder.group({
      userAddress: ['', Validators.required]
    });
    this.fourthFormGroup = this.formBuilder.group({
      userEmailAddress: ['', Validators.email],
      userPassword: ['', Validators.required],
      userPasswordConfirm: ['', Validators.required]
    });

  }


  getAddress() {
    this.addressData = [];
    this.httpService.getProducts(this.userEnteredPostcode).subscribe((data: {}) => {
      this.addressData = data;
      let currAddressStr = '';
      for (let i = 0; i < this.addressData.addresses.length; i++) {
        const formattedAddressLocal = this.addressData.addresses[i].formatted_address;
        currAddressStr = '';
        for (let j = 0; j < formattedAddressLocal.length; j++) {
          if (formattedAddressLocal[j].trim() !== '') {
            if (j === 0) {
              currAddressStr += formattedAddressLocal[j];
            } else {
              currAddressStr += ', ' + formattedAddressLocal[j];
            }
          }
        }
        console.log('formattedAddress Array >> ' + currAddressStr);
        this.userFormattedAddress[i] = currAddressStr;
     }

      setTimeout(() => {
        this.spinner.hide();
        this.showAddressAPIData();
        this.openDialog();
      }, 200);
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialogComponent, {
      width: '650px',
      data: {userFormattedAddress: this.userFormattedAddress, userSelectedAddress: this.userSelectedAddress}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed  ' + result);
      if (result === undefined) {
        result = 'Selected address will appear here.';
      }
      this.userSelectedAddress = result;
    });
  }


  get ffirstFormGroup() { return this.firstFormGroup.controls; }
  get fsecondFormGroup() { return this.secondFormGroup.controls; }
  get fthirdFormGroup() { return this.thirdFormGroup.controls; }
  get ffourthFormGroup() { return this.fourthFormGroup.controls; }

  closeSignUpComponent(evt: Event) {
    console.log('Log :: Signup Component Closed >>  ');
    this.route.navigate(['/authentication']);
  }


  updateSliderValue(event) {

    switch (event.value) {
      case 0:
        this.userRegisteredGender = 'male';
        break;

      case 50:
        this.userRegisteredGender = 'female';
        break;

      case 100:
        this.userRegisteredGender = 'other';
        break;

      default:
        break;
    }


    this.secondFormGroup.value.gender = this.userRegisteredGender;
    console.log('Log :: User Registered Gender >>  ' + this.userRegisteredGender);

  }

  stepperMoveBack(stepper: MatStepper) {
    if (this.currentSectionInDisplay !== 1) {
      this.currentSectionInDisplay--;
    }
    this.showActiveStep();
    this.setNextButtonVisibility();
    stepper.previous();
  }

  setNextButtonVisibility() {
    if (this.currentSectionInDisplay === this.totalSections) {
      document.getElementById('stepperNextButton').hidden = true;
      document.getElementById('stepperBackButton').hidden = true;
      document.getElementById('signupCloseButton').hidden = true;
      const targerHTMLElement = document.getElementById('signInSuccessMessage');
      targerHTMLElement.classList.remove('hideSignInSuccess');
      // document.getElementById('signInSuccessMessage').style.display = 'block !important';
    }
  }

  validateFormFields(stepper: MatStepper) {

    this.movingNext = true;
    /*  console.log(' this.firstFormGroup.invalid >>  ' + this.firstFormGroup.invalid,
    this.secondFormGroup.invalid, this.thirdFormGroup.invalid, this.fourthFormGroup.invalid); */
    document.getElementById('stepperNextButton').hidden = false;
    switch (this.currentSectionInDisplay) {
      case 1:
        if (this.firstFormGroup.invalid === true) {
          stepper.next();
          if (this.firstFormGroup.controls.firstName.value === undefined || this.firstFormGroup.controls.firstName.value === '') {
            Swal.fire({
              title: 'Required',
              text: 'Providing first name is mandetory',
              type: 'info',
              confirmButtonText: 'OK'
            });
            return;
          }
          if (this.firstFormGroup.controls.lastName.value === undefined || this.firstFormGroup.controls.lastName.value === '') {
            Swal.fire({
              title: 'Required',
              text: 'Providing last name is mandetory',
              type: 'info',
              confirmButtonText: 'OK'
            });
            return;
          }
        }
        this.userRegisteredName = this.firstFormGroup.controls.firstName.value + ' ' + this.firstFormGroup.controls.lastName.value;
        break;

      case 2:
          if (this.secondFormGroup.invalid === true) {
            stepper.next();

            if (this.secondFormGroup.controls.DOB.value === undefined || this.secondFormGroup.controls.DOB.value === '') {
              Swal.fire({
                title: 'Required',
                text: 'Please provide your Date of Birth',
                type: 'info',
                confirmButtonText: 'OK'
              });
              return;
            }
            if (this.secondFormGroup.controls.NHS.value === undefined || this.secondFormGroup.controls.NHS.value === '') {
              Swal.fire({
                title: 'Required',
                text: 'Please provide your 6 digit NHS number',
                type: 'info',
                confirmButtonText: 'OK'
              });
              return;
            }

            if (this.secondFormGroup.controls.NHS.value.length < this.userNHSNumberMaxLength) {
              Swal.fire({
                title: 'Required',
                text: 'NHS number should be of 6 digits',
                type: 'info',
                confirmButtonText: 'OK'
              });
              return;
            }

            // tslint:disable-next-line: max-line-length
            if (this.secondFormGroup.controls.userPhoneNumber.value === undefined || this.secondFormGroup.controls.userPhoneNumber.value === '') {
              Swal.fire({
                title: 'Required',
                text: 'Please provide your 10 digit Phone number',
                type: 'info',
                confirmButtonText: 'OK'
              });
              return;
            }

            if (this.secondFormGroup.controls.userPhoneNumber.value.length < this.userPhoneNumberMaxLength) {
              Swal.fire({
                title: 'Required',
                text: 'Phone number should be of 10 digits',
                type: 'info',
                confirmButtonText: 'OK'
              });
              return;
            }



            return;
          }
          break;

      case 3:
        // stepper.next();
        if (this.thirdFormGroup.invalid === true) {
          Swal.fire({
            title: 'Required',
            text: 'Please provide a postcode to search home address',
            type: 'info',
            confirmButtonText: 'OK'
          });
          return;
        }
        // tslint:disable-next-line: max-line-length
        if (this.userSelectedAddress === 'Selected address will appear here.' || this.userSelectedAddress === '') {
          Swal.fire({
            title: 'Required',
            text: 'Identifying an address is mandatory',
            type: 'info',
            confirmButtonText: 'OK'
          });
          return;
        }
        break;

      case 4:
        if (this.fourthFormGroup.invalid === true) {
          stepper.next();

          // tslint:disable-next-line: max-line-length
          if (this.fourthFormGroup.controls.userEmailAddress.value === undefined || this.fourthFormGroup.controls.userEmailAddress.value === '') {
            Swal.fire({
              title: 'Required',
              text: 'Please provide your an E-mail ID',
              type: 'info',
              confirmButtonText: 'OK'
            });
            return;
          }

          if (this.fourthFormGroup.controls.userPassword.value === undefined || this.fourthFormGroup.controls.userPassword.value === '') {
            Swal.fire({
              title: 'Required',
              text: 'Please set a password',
              type: 'info',
              confirmButtonText: 'OK'
            });
            return;
          }

          // tslint:disable-next-line: max-line-length
          if (this.fourthFormGroup.controls.userPasswordConfirm.value === undefined || this.fourthFormGroup.controls.userPasswordConfirm.value === '') {
            Swal.fire({
              title: 'Required',
              text: 'Please confirm your password',
              type: 'info',
              confirmButtonText: 'OK'
            });
            return;
          }

          return;
        }

        if (this.fourthFormGroup.controls.userPassword.value !== this.fourthFormGroup.controls.userPasswordConfirm.value) {
          Swal.fire({
            title: 'Password Mismatch',
            text: 'Passwords did not match',
            type: 'error',
            confirmButtonText: 'Try Again'
          });
          return;
        }

        break;

      default:
        break;
    }

    console.log(' this.currentSectionInDisplay ' + this.currentSectionInDisplay);
    // console.log(' userRegisteredName + ' + JSON.stringify(this.firstFormGroup.value), JSON.stringify(this.secondFormGroup.value));
    this.currentSectionInDisplay++;
    this.showActiveStep();
    stepper.next();
    this.setNextButtonVisibility();
  }


  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  numberDateOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    console.log('charcode >> ' + charCode);
    if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 47) {
      return false;
    }
    return true;
  }

  getUserEnteredPincodeAddressList(event): void {

    if (this.thirdFormGroup.invalid) {
      return;
    }
    this.getAddress();
    this.spinner.show();
  }

  showAddressAPIData(): void {
    console.log('showAddressAPIData');
  }

  showActiveStep(): void {
    const totalSteps: number = document.getElementById('stepContainer').children.length;
    console.log(' the total step ' + totalSteps);
    for (let index = 1; index <= totalSteps; index++) {
      if (index < this.currentSectionInDisplay) {
        document.getElementById('step' + index).classList.remove('visited');
        document.getElementById('step' + index).classList.remove('active');
        document.getElementById('step' + index).classList.add('visited');
      } else if (index === this.currentSectionInDisplay) {
        document.getElementById('step' + index).classList.add('active');
      } else if (index > this.currentSectionInDisplay) {
        document.getElementById('step' + index).classList.remove('active');
        document.getElementById('step' + index).classList.remove('visited');
      }
    }
  }
}

