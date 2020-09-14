import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthenticationsService } from 'src/app/core/services/authentications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup
  submitted: Boolean = false;
  message:String;
  constructor(
    private fb: FormBuilder,
    private authentications : AuthenticationsService,
    private router : Router
  ) { }

  ngOnInit(): void {
    this.createForgotPasswordForm();
  }

  // Create forgot password form
  createForgotPasswordForm() {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  get f() { return this.forgotPasswordForm.controls; }

  // Submit forgot password form
  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.forgotPasswordForm.invalid) {
      return;
    }
    this.forgotPassword();
  }

  forgotPassword(){
    this.authentications.forgotPassword(this.forgotPasswordForm.value).subscribe((data :any) => {
     if(data && data.message) this.message = data.message;
     //this.forgotPasswordForm.reset();
     this.router.navigate(['/login'], { queryParams: { returnUrl: this.router.url , message : this.message }});

    }, (err) => {
      console.log(err)
      if(err) this.message = err.error.message;

    }) 
  }


}
