
import { Component, OnInit } from '@angular/core';
import { FormControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ConfirmedValidator } from '../../../core/helpers/validators/confirmed.validator';
import { ActivatedRoute, Router }     from '@angular/router';
import { AuthenticationsService } from 'src/app/core/services/authentications.service';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetPasswordFrom: FormGroup
  submitted: Boolean = false;
  user_id : number
  constructor(
    private fb: FormBuilder,private route: ActivatedRoute,
    private authentications : AuthenticationsService,
    private router : Router
    ) { 
    this.getUserIdFromUrl()
    }

    // Get user id and type from url
    getUserIdFromUrl(){
      this.route.queryParams.subscribe(
        data => {
         this.user_id =  data['id'];
        });
    }

  ngOnInit(): void {
    this.createresetPasswordFrom();
  }

  // Create reset password form
  createresetPasswordFrom() {
    this.resetPasswordFrom = this.fb.group({
      id: [this.user_id, [Validators.required]],
      password: ['', [Validators.required ,Validators.minLength(10)]],
      confirm_password: ['', [Validators.required]],

    },{
      validator: ConfirmedValidator('password', 'confirm_password')
    });
  }

  get f() { return this.resetPasswordFrom.controls; }

  // Submit reset password form
  submitForm() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.resetPasswordFrom.invalid) {
      return;
    }
    this.resetPassword()
  }

  resetPassword(){
    const formdata = this.resetPasswordFrom.value
   this.authentications.resetPassword(formdata).subscribe((data : any) => {
     let url = this.router.url.substring(0,this.router.url.indexOf('?'))
    if(data && data.message)   this.router.navigate(['/login'], { queryParams: { returnUrl: url , message : data.message }});

   },(err) => {

   })
  }


}
