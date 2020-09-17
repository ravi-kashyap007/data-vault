import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthenticationsService } from '../../../core/services/authentications.service';
import { UtilityService } from '../../../core/services/utility.service';
import { Subscription } from 'rxjs';
// import { SocketIoService } from '../../../core/services/socket-io.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  ipAddress: string;
  returnUrl: string;
  message: string;
  subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationsService,
    private router: Router,
    // private socketService: SocketIoService,
    private util: UtilityService,
    private route: ActivatedRoute
  ) {
    // fetch IP address
    // this.util.getIpAddress().subscribe((address: any) => this.ipAddress = address.ip);

    // Setup Socket Connection
    // this.socketService.initialiseSocketConnection();
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    if (this.returnUrl === '/forgot-password' || this.returnUrl === '/reset-password') {
      this.message = this.route.snapshot.queryParams['message'];
      console.log(this.returnUrl)
    }

    // Login Form
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });
  }

  f(control?: string, error?: string): boolean | any {
    if (control && error) {
      return this.loginForm.get(control).hasError(error);
    } else if (control) {
      return this.loginForm.get(control);
    } else {
      return this.loginForm.controls;
    }
  }

  // Login
  login(): void {
    const loginValue = this.loginForm.value;
    if (this.loginForm.valid) {
      if (this.loginForm.get('email').value && this.loginForm.get('password').value) {
        console.log('Payload: ', loginValue);

        // Service call
        this.subscription.push(
          this.authService.login(loginValue).subscribe(res => {
            const response = Object.assign({}, res.body);
            console.log('Success Response: ', response);

            // Email not found | password incorrect
            if (response.statusCode === 400) {
              this.util.toast(response.message);
            }

            // User not verified
            if (response.statusCode === 401) {
              this.util.toast(response.message);
              // redirect to resend page
            }

            // Successfully login
            if (response.statusCode === 200) {
              // Pre-requistics
              // For step 1
              if ((!response.data.register_step1 || response.data.register_step1 === 0) &&
                (!response.data.skip_register_step1 || response.data.skip_register_step1 === 0)) {
                this.router.navigate(['wizard-steps'], { queryParams: { step: 1, _id: response.data.user_id } });
              }

              // For step 2
              if ((!response.data.register_step2 || response.data.register_step2 === 0) &&
                (!response.data.skip_register_step2 || response.data.skip_register_step1 === 0)) {
                this.router.navigate(['wizard-steps'],
                  { queryParams: { step: 2, _id: response.data.user_id, companyID: response.data.company_id } });
              }

              // All set
              if (response.data.register_step1 === 1 && response.data.register_step2 === 1) {
                // set login user
                this.authService.setLoginUser(response.data);
                // set user token
                this.authService.setUserToken(response.data.accessToken);
                // redirect to content
                this.router.navigate(['/content']);
              }
            }
          }, err => {
            console.log('Error Response: ', err.error.errors[0].password);
            const message = err.error.errors[0].password ? err.error.errors[0].password : err.error.errors;
            this.util.toast(message);
          })
        );
      }
    } else {
      this.util.toast('please provide a required field.');
    }
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
