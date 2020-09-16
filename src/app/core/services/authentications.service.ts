import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthenticationsService {
  public loginUser: Observable<any>;
  public loginToken: Observable<any>;
  private currentUserSubject: BehaviorSubject<any>;
  private currentTokenSubject: BehaviorSubject<any>;
  private apiUrl = environment.apiUrl;
  loginCurrentUser: any;
  userAccessToken: any;

  constructor(
    public router: Router,
    private http: HttpClient,
  ) {
    if (localStorage.getItem('loginUser')) {
      this.loginCurrentUser = JSON.parse(localStorage.getItem('loginUser'));
      this.userAccessToken = localStorage.getItem('access_token');
    }

    this.currentUserSubject = new BehaviorSubject<any>(this.loginCurrentUser);
    this.currentTokenSubject = new BehaviorSubject<any>(this.userAccessToken);

    this.loginUser = this.currentUserSubject.asObservable();
    this.loginToken = this.currentTokenSubject.asObservable();
  }

  // Observable - Get Current User Value
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // Observable - Get token value
  public get currentTokenValue(): any {
    return this.currentTokenSubject.value;
  }

  // Set Login user
  setLoginUser(user) {
    localStorage.setItem('loginUser', JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  // Set user token
  setUserToken(token) {
    localStorage.setItem('access_token', token);
    this.currentTokenSubject.next(token);
  }

  // Get Token
  getToken() {
    return localStorage.getItem('access_token');
  }

  // Check user loggedIn or not
  isLoggedIn() {
    return this.getToken() !== null;
  }

  // Registration
  register(user: any) {
    return this.http.post(`${this.apiUrl}/auth/registration`, user);
  }

  forgotPassword(data: any) {
    return this.http.post(`${this.apiUrl}/auth/forget-password`, data);

  }

  resetPassword(data: any) {
    return this.http.post(`${this.apiUrl}/auth/reset-password`, data);
  }

  // Login
  login(userData: any) {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, userData, { observe: 'response' });
  }

  // logout user
  logout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('access_token');
    alert('You have successfully logged out.')
    this.router.navigate(['/login']);
  }

  // Email Verification
  emailVerification(email) {
    return this.http.get(`${this.apiUrl}/auth/verify-email/${email}`, { observe: 'response' });
  }

  // Registration wizard step 1
  registrationStep1(payload) {
    return this.http.post(`${this.apiUrl}/auth/registration-step1`, payload, { observe: 'response' });
  }

  // Registration wizard step 2
  registrationStep2(payload) {
    return this.http.post(`${this.apiUrl}/auth/registration-step2`, payload, { observe: 'response' });
  }

  // Get business industries
  getBusinessIndustries() {
    return this.http.get(`${this.apiUrl}/auth/get_plan_questions`);
  }

  // Get business industries
  getBusinessRoles() {
    return this.http.get(`${this.apiUrl}/auth/get_level_questions`);
  }
}
