import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpEvent,
  HttpRequest,
  HttpHandler,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SESSION_TOKEN } from 'src/constants/session.constants';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    httpRequest: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    httpRequest = httpRequest.clone({
      setHeaders: {
        Authorization: `Bearer ${SESSION_TOKEN}`,
      },
    });
    return next.handle(httpRequest);
  }
}
