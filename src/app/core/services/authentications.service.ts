import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

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
		if(localStorage.getItem('loginUser')) {
			this.loginCurrentUser = JSON.parse(localStorage.getItem('loginUser'));
			this.userAccessToken = JSON.parse(localStorage.getItem('access_token'));
		}
		this.currentUserSubject = new BehaviorSubject<any>(this.loginCurrentUser);
		this.currentTokenSubject = new BehaviorSubject<any>(this.userAccessToken);
		this.loginUser = this.currentUserSubject.asObservable();
		this.loginToken = this.currentTokenSubject.asObservable();
	}

	public get currentUserValue(): any {
		return this.currentUserSubject.value;
	}

	public get currentTokenValue(): any {
		return this.currentTokenSubject.value;
	}

	setLoginUser(user) {
		localStorage.setItem('loginUser', JSON.stringify(user));
		this.currentUserSubject.next(user);
	}


	getToken() {
		return localStorage.getItem("access_token")
	}

	isLoggedIn() {
		return this.getToken() !== null;
	}

	register(user: any) {
		return this.http.post(`${this.apiUrl}/auth/registration`, user);
	}

	login(email: string, password: string) {
		return this.http.post<any>(`${this.apiUrl}/auth/login`, { email, password })
			.pipe(map(user => {
				if (user) {
					localStorage.setItem('access_token', JSON.stringify(user));
					this.currentTokenSubject.next(user);
				}
				return user;
			}));
	}

	logout() {
    localStorage.removeItem('loginUser');
    localStorage.removeItem('access_token');
    alert('You have successfully logged out.')
    this.router.navigate(['/login']);
	}
}
