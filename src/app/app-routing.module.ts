import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './modules/auth/login/login.component';
import { RegisterComponent } from './modules/auth/register/register.component';
import { ForgotPasswordComponent } from './modules/auth/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './modules/auth/reset-password/reset-password.component';
import { WizardStepComponent } from './modules/auth/wizard-step/wizard-step.component';
import { ConfirmPageComponent } from './modules/auth/confirm-page/confirm-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'register', component: RegisterComponent
  },
  {
    path: 'forgot-password', component: ForgotPasswordComponent
  },
  {
    path: 'reset-password', component: ResetPasswordComponent
  },
  {
    path: 'verify-email', component: WizardStepComponent
  },
  {
    path: 'wizard-steps', component: WizardStepComponent
  },
  {
    path: 'thank-you', component: ConfirmPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
