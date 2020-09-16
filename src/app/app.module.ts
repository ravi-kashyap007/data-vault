import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './shared/material.module';
import { MDBBootstrapModule, CarouselModule, WavesModule } from 'angular-bootstrap-md';

import { AppComponent } from './app.component';
import { HttpConfigInterceptor } from './core/interceptor/http-config.interceptor';
import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { WizardStepComponent } from './modules/auth/wizard-step/wizard-step.component';
import { ConfirmPageComponent } from './modules/auth/confirm-page/confirm-page.component';
import { AllSetComponent } from './modules/auth/all-set/all-set.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    WizardStepComponent,
    ConfirmPageComponent,
    AllSetComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    CarouselModule,
    WavesModule,
    MDBBootstrapModule.forRoot()
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true },
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
