import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {

  constructor(
    private http: HttpClient
  ) { }

  // fetch IP address
  getIpAddress() {
    return this.http.get('http://api.ipify.org/?format=json');
  }
}
