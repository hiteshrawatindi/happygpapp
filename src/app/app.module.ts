import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppRoutingModule } from './app-routing.module';
import { RouterModule, Routes } from '@angular/router';

import { NgxSpinnerModule } from 'ngx-spinner';

import { AppComponent } from './app.component';

import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';




import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatFormFieldModule, MatInputModule,
  MatRippleModule, MatCheckboxModule, MatDatepickerModule
} from '@angular/material';
import { MatStepperModule } from '@angular/material/stepper';
import { CdkStepperModule } from '@angular/cdk/stepper';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSliderModule } from '@angular/material/slider';
import { MatDialogModule } from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatTabsModule} from '@angular/material/tabs';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import 'hammerjs';
import { UserprofileComponent } from './appcomponent/userprofile/userprofile.component';
import { SignupComponent, DialogOverviewExampleDialogComponent } from './appcomponent/signup/signup.component';
import { AuthenticationComponent } from './appcomponent/authentication/authentication.component';
import { DashboardComponent } from './appcomponent/dashboard/dashboard.component';
import { InappnotificationsComponent } from './appcomponent/inappnotifications/inappnotifications.component';




const appRoutes: Routes = [
  { path: '', redirectTo: 'authentication', pathMatch: 'full' },
  { path: 'authentication', component: AuthenticationComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'userprofile', component: UserprofileComponent },
  { path: 'inappnotification', component: InappnotificationsComponent },
  { path: '**', redirectTo: 'authentication', pathMatch: 'full' }
];


const modules: MatNativeDateModule = [
  MatNativeDateModule
];


@NgModule({
  declarations: [
    AppComponent,
    AuthenticationComponent,
    DashboardComponent,
    SignupComponent,
    DialogOverviewExampleDialogComponent,
    UserprofileComponent,
    InappnotificationsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    [MatNativeDateModule, MatButtonModule, MatFormFieldModule, MatInputModule,
    MatRippleModule, MatCheckboxModule, MatDatepickerModule, MatListModule, MatIconModule, MatCardModule],
    MatSliderModule,
    HttpClientModule,
    NgxSpinnerModule,
    MatTabsModule,
    CdkStepperModule, MatStepperModule,
    RouterModule.forRoot(appRoutes),
    NgbModule
  ],
  exports: [
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatDatepickerModule,
    CdkStepperModule,
    MatIconModule,
    MatDialogModule,
    MatListModule,
    MatSliderModule,
    MatCardModule,
     MatTabsModule
  ],
  providers: [
    MatDatepickerModule
  ],
  entryComponents: [DialogOverviewExampleDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
