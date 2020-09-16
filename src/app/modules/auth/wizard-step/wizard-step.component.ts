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
  companyID: number;
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
              this._id = query.id ? parseInt(query.id) : 0;
              // Verification process
              this.emailVerification();
            })
          );
        } else {
          this.subscription.push(
            this.activatedRoute.queryParams.subscribe((query) => {
              if (query.step && query._id) {

                if (query.step === '1') {
                  // pre-checking wizard
                  this.wizardStep1 = true;
                  this.wizardStep2 = false;
                  this._id = query._id ? parseInt(query._id) : 0;

                  // get business industry and business role
                  this.auth.getBusinessIndustries().subscribe((res: any) => this.industries = res.data);
                  this.auth.getBusinessRoles().subscribe((res: any) => this.roles = res.data);

                } else if (query.step === '2' && query.companyID) {
                  this.wizardStep1 = false;
                  this.wizardStep2 = true;
                  this._id = query._id ? parseInt(query._id) : 0;
                  this.companyID = query.companyID ? parseInt(query.companyID) : 0;
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
      teamEmail1: ['', [Validators.email]],
      teamEmail2: ['', [Validators.email]],
      teamEmail3: ['', [Validators.email]]
    });
  }

  // Email Verification
  emailVerification(): void {
    console.log('Email Verification: ', this.emailID, this._id);
    if (this.emailID && this._id !== 0) {
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

  // wizard 1 submit
  wizard1(): void {
    if (this.wizardForm1.valid) {
      // payload
      const payload = {
        id: this._id,
        buisness_industry: this.wizardForm1.get('business_industry').value,
        business_role: this.wizardForm1.get('business_role').value,
        skip_register_step1: false,
        register_step1: true
      };

      console.log('Wizard Step 1: ', payload);
      // service call
      this.subscription.push(
        this.auth.registrationStep1(payload).subscribe((res) => {

          if (res.status === 200) {
            const body: any = Object.assign({}, res.body);
            console.log('Message: ', body.data);
            this.route.navigate(['wizard-steps'], { queryParams: { step: 2, _id: body.data.user_id, companyID: body.data.company_id } });
          }
        }, err => {
          this.util.toast(err.error.message);
          this.route.navigate(['/']);
        })
      );
    }
  }

  // Skip wizard 1
  skipWizard1(): void {
    const payload = {
      id: 48,
      buisness_industry: '',
      business_role: '',
      skip_register_step1: true,
      register_step1: true
    };

    // service call
    this.subscription.push(
      this.auth.registrationStep1(payload).subscribe((res) => {

        if (res.status === 200) {
          const body: any = Object.assign({}, res.body);
          console.log('Message: ', body.data);
          this.route.navigate(['wizard-steps'], { queryParams: { step: 2, _id: body.data.user_id, companyID: body.data.company_id } });
        }
      }, err => {
        this.util.toast(err.error.message);
        this.route.navigate(['/']);
      })
    );
  }

  // wizard 2 submit
  wizard2(): void {
    if (this.wizardForm2.valid) {
      if (this.wizardForm2.get('teamEmail1').value ||
        this.wizardForm2.get('teamEmail2').value || this.wizardForm2.get('teamEmail3').value) {
        console.log('Wizard2 : ', this.wizardForm2.value);
        const emails = [];
        if (this.wizardForm2.get('teamEmail1').value) {
          emails.push(this.wizardForm2.get('teamEmail1').value);
        }

        if (this.wizardForm2.get('teamEmail2').value) {
          emails.push(this.wizardForm2.get('teamEmail2').value);
        }

        if (this.wizardForm2.get('teamEmail3').value) {
          emails.push(this.wizardForm2.get('teamEmail3').value);
        }

        const payload = {
          id: this._id,
          email: emails,
          skip_register_step2: false,
          register_step2: true,
          company_id: this.companyID
        };

        console.log('Payload : ', payload);
        // Service call
        this.subscription.push(
          this.auth.registrationStep2(payload).subscribe((res) => {

            if (res.status === 200) {
              const body: any = Object.assign({}, res.body);

              // Set Login User
              this.auth.setLoginUser(body.data);

              // Set User token
              this.auth.setUserToken(body.data.accessToken);

              this.route.navigate(['all-set']);
            }
          }, err => {
            this.util.toast(err.error.message);
            this.route.navigate(['/']);
          })
        );

      } else {
        this.util.toast(`Email can't be blank.`);
      }
    } else {
      this.util.toast(`The email must be a valid email address.`);
    }
  }

  // Skip wizard 2
  skipWizard2(): void {
    const payload = {
      id: this._id,
      email: [],
      skip_register_step2: true,
      register_step2: true,
      company_id: this.companyID
    };

    console.log('Payload : ', payload);
    // service call
    this.subscription.push(
      this.auth.registrationStep2(payload).subscribe((res) => {

        if (res.status === 200) {
          const body: any = Object.assign({}, res.body);

          // Set Login User
          this.auth.setLoginUser(body.data);

          // Set User token
          this.auth.setUserToken(body.data.accessToken);

          this.route.navigate(['all-set']);
        }
      }, err => {
        this.util.toast(err.error.message);
        this.route.navigate(['/']);
      })
    );
  }


  ngOnDestroy(): void {
    this.subscription.forEach((subscription) => {
      subscription.unsubscribe();
    });
  }
}
