import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';

const routes: Routes = [
  {
		path: '',
		redirectTo: 'login',
		pathMatch: 'full'
	},
  {
    path :'login' , component: LoginComponent
  },
  {
    path :'register' , component: RegistrationComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
