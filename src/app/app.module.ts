import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpConfigInterceptor} from './core/interceptor/http-config.interceptor';
import { LoginComponent } from './modules/login/login.component';
import { RegistrationComponent } from './modules/registration/registration.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
