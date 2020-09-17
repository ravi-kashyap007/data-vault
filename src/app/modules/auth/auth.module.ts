import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { CarouselModule, MDBBootstrapModule, WavesModule } from 'angular-bootstrap-md';
import { MaterialModule } from 'src/app/shared/material.module';

import { AuthRoutingModule } from './auth-routing.module';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';
import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { AllSetComponent } from './all-set/all-set.component';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ConfirmPageComponent,
    WizardStepComponent,
    AllSetComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CarouselModule,
    WavesModule,
    MDBBootstrapModule.forRoot()
  ]
})
export class AuthModule { }
