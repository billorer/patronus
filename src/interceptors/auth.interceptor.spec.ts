import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { SESSION_TOKEN } from 'src/constants/session.constants';
import { AuthInterceptor } from './auth.interceptor';

describe('AuthInterceptor', () => {
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: AuthInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it(
    'should add bearer token',
    waitForAsync(() => {
      const testUrl = '/test';
      httpClient.get(testUrl).subscribe();

      const request = httpController.expectOne(testUrl);
      expect(request.request.headers.get('Authorization')).toEqual(
        `Bearer ${SESSION_TOKEN}`
      );
    })
  );
});
