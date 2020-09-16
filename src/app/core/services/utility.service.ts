import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(
    private http: HttpClient,
    private _toastBar: MatSnackBar
  ) { }

  // fetch IP address
  getIpAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
  }

  // toast
  toast(msg) {
   this._toastBar.open(msg, '', {
    duration: 2000,
    horizontalPosition: this.horizontalPosition,
    verticalPosition: this.verticalPosition,
   });
  }
}
