import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSetComponent } from './all-set/all-set.component';

import { ConfirmPageComponent } from './confirm-page/confirm-page.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { WizardStepComponent } from './wizard-step/wizard-step.component';

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
  },
  {
    path: 'all-set', component: AllSetComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
