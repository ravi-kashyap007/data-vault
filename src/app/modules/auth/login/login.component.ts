import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';

// import { AuthenticationsService } from '../../../core/services/authentications.service';
// import { UtilityService } from '../../../core/services/utility.service';
// import { SocketIoService } from '../../../core/services/socket-io.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  // loginForm: FormGroup;
  ipAddress: string;
  returnUrl: string;
  message: string
  constructor(
    // private fb: FormBuilder,
    // private authService: AuthenticationsService,
    // private socketService: SocketIoService,
    // private util: UtilityService
    private route : ActivatedRoute
  ) {
    // fetch IP address
    // this.util.getIpAddress().subscribe((address: any) => this.ipAddress = address.ip);

    // Setup Socket Connection
    // this.socketService.initialiseSocketConnection();
  }

  ngOnInit(): void {
    // this.loginForm = this.fb.group({
    //   email: ['', [Validators.required]],
    //   password: ['', [Validators.required]]
    // });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    if(this.returnUrl === '/forgot-password' || this.returnUrl === '/reset-password') this.message = this.route.snapshot.queryParams['message']
    console.log(this.returnUrl)

  }

  // Login
  login() {
    // const loginValue = this.loginForm.value;
    const loginValue = {
      email: 'ravi.kashyap@lmsin.com',
      password: '123456',
      ip_address: this.ipAddress
    };

    // Login
    // this.authService.login(loginValue).subscribe(res => {
    //   console.log('Response: ', res);
    // }, err => {
    //   console.log('Response: ', err.error.errors);
    // });
  }

}
