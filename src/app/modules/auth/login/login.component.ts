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
    console.log('Payload: ', loginValue);

    // Service call
    this.subscription.push(
      this.authService.login(loginValue).subscribe(res => {
        const response = Object.assign({}, res.data);
        console.log('Response: ', response);

        // checking Email verification
        if (!response.verify_status && response.verify_status === 0) {
          this.router.navigate(['thank-you']);
        }
        // this.router.navigate(['/']);
      }, err => {
        console.log('Response: ', err.error.errors);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
