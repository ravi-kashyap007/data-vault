import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
	HttpInterceptor,
	HttpRequest,
	HttpResponse,
	HttpHandler,
	HttpEvent,
	HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { AuthenticationsService } from '../services/authentications.service';

@Injectable()

export class HttpConfigInterceptor implements HttpInterceptor {
	
	/**
	 *	@class HttpConfigInterceptor
	 *	@constructor
	*/
	constructor(
		public router: Router,
		public authenticationService: AuthenticationsService,
	) { }

	/**
	 *	Transform the outgoing request before passing it to the next interceptor in the chain, by calling next.handle() method
	 *
	 *	@class HttpConfigInterceptor
	 *	@method intercept
	 *	@param {request} request
	 *	@param {next} httpHandler
	*/
	intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let loginToken = this.authenticationService.currentTokenValue;
		
		if (loginToken) {
			request = request.clone({ headers: request.headers.set('Authorization', loginToken.token_type + ' ' + loginToken.token) });
		}

		if (!request.headers.has('Content-Type')) {
			request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
		}

		request = request.clone({ headers: request.headers.set('Accept', 'application/json') });

		return next.handle(request).pipe(
			map((event: HttpEvent<any>) => {
				if (event instanceof HttpResponse) {
				}
				return event;
			}),
			catchError((error: HttpErrorResponse) => {

				switch (error.status) {
					case 200:
						break;
					case 400:
						break;
					case 401:
						break;
					case 403:
						break;
					case 404:
						break;
				
					default:
						break;
				}
				return throwError(error);
			}));
	}
}