import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, pluck } from 'rxjs/operators';
import { AuthenticationsService } from 'src/app/core/services/authentications.service';
import { UtilityService } from 'src/app/core/services/utility.service';

@Component({
  selector: 'app-wizard-step',
  templateUrl: './wizard-step.component.html',
  styleUrls: ['./wizard-step.component.scss']
})
export class WizardStepComponent implements OnInit, OnDestroy {
  wizardStep1: boolean;
  wizardStep2: boolean;
  _id: number;
  emailID: string;
  step: number;
  wizardForm1: FormGroup;
  wizardForm2: FormGroup;
  industries: any = [];
  roles: any = [];
  subscription: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private auth: AuthenticationsService,
    private route: Router,
    private util: UtilityService
  ) {
    this.subscription.push(
      this.activatedRoute.url.subscribe((url) => {

        // check verification email
        if (url[0].path === 'verify-email') {
          this.subscription.push(
            this.activatedRoute.queryParams.subscribe((query) => {
              this.emailID = query.email ? query.email : '';
              this._id = query.id ? query.id as number : 0;
              // Verification process
              this.emailVerification();
            })
          );
        } else {
          this.subscription.push(
            this.activatedRoute.queryParams.subscribe((query) => {
              if (query.step) {

                if (query.step === '1') {
                  // pre-checking wizard
                  this.wizardStep1 = true;
                  this.wizardStep2 = false;

                  // get business industry and business role
                  this.auth.getBusinessIndustries().subscribe((res: any) => this.industries =  res.data);
                  this.auth.getBusinessRoles().subscribe((res: any) => this.roles =  res.data);

                } else if (query.step === '2') {
                  this.wizardStep1 = false;
                  this.wizardStep2 = true;
                } else {
                  // redirect to login
                  this.route.navigate(['/']);
                }

              } else {
                // redirect to login
                this.route.navigate(['/']);
              }
            })
          );
        }
      })
    );
  }

  ngOnInit(): void {
    this.wizardForm1 = this.fb.group({
      business_industry: ['', [Validators.required]],
      business_role: ['', [Validators.required]]
    });

    this.wizardForm2 = this.fb.group({
      teamEmail1: [''],
      teamEmail2: [''],
      teamEmail3: ['']
    });
  }

  // Email Verification
  emailVerification(): void {
    console.log('Email Verification: ', this.emailID);
    if (this.emailID) {
      // service call
      this.subscription.push(
        this.auth.emailVerification(this.emailID).subscribe((res) => {

          if (res.status === 200) {
            console.log('Message: ', res.body);
            this.route.navigate(['wizard-steps'], { queryParams: { step: 1, _id: this._id } });
          }
        }, err => {
          this.util.toast(err.error.message);
          this.route.navigate(['/']);
        })
      );
    } else {
      this.route.navigate(['/']);
    }
  }

  // Skip wizard 1
  skipWizard1() {

    const payload = {
      id: 48,
      skip_register_step2: 1,
      register_step1: true
    };

    // service call
    // this.auth.registrationStep1()

    this.route.navigate(['wizard-steps'], { queryParams: { step: 2 } });
  }

  // wizard 1 submit
  wizard1() {
    // console.log('_id: ', _id);
    if (this.wizardForm1.valid) {
      console.log('Wizard Step 1: ', this.wizardForm1.valid);
      // service call

    }
  }

  // Skip wizard 2
  skipWizard2() {

    // service call

    // Redirect to all set

  }

  // wizard 2 submit
  wizard2() {
    
  }

  ngOnDestroy() {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
