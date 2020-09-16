import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { matchPassword, passwordValidator } from '../../../core/helpers/validators/confirmed.validator';
import { AuthenticationsService } from '../../../core/services/authentications.service';
import { UtilityService } from '../../../core/services/utility.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registrationForm: FormGroup;
  subscription: Subscription[] = [];

  constructor(
    private authService: AuthenticationsService,
    private router: Router,
    private util: UtilityService,
    private fb: FormBuilder,
  ) {

  }

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, passwordValidator]],
      confirmPassword: ['', [Validators.required]],
    }, { validators: [matchPassword] });
  }

  // SignUp
  register(): void {
    const registerValue = Object.assign({}, this.registrationForm.getRawValue());

    // delete form field
    delete registerValue.confirmPassword;

    console.log('registerValue: ', registerValue);

    // register API call
    this.subscription.push(
      this.authService.register(registerValue).subscribe((response: any) => {
        console.log('Response: ', response);
        this.registrationForm.reset({
          first_name: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: ''
        });
        this.router.navigate(['thank-you']);
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }

}
