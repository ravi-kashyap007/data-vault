import { AbstractControl, FormGroup } from '@angular/forms';

// Password Validation
export function passwordValidator(control: AbstractControl): any | null {
  // Check onLoad empty
  if (control.pristine) {
    return null;
  }

  if (control.value) {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

    if (passRegex.test(control.value)) {
      return null;
    }

    return { isPassword: true };
  } else {
    return { isPassword: true };
  }
}

// match password
export function matchPassword(control: AbstractControl): any | null {
  // Check onLoad empty
  if (control.pristine) {
    return null;
  }

  if (control.value.password === control.value.confirmPassword) {
    return null;
  } else {
    return { isPasswordMatch: true };
  }
}

// Matching password
export function ConfirmedValidator(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];
    if (matchingControl.errors && !matchingControl.errors.confirmedValidator) {
      return;
    }
    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmedValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  }
}