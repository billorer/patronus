import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpErrorInterceptor } from './error.interceptor';

describe('ErrorInterceptor', () => {
  let httpClient: HttpClient;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpErrorInterceptor,
          multi: true,
        },
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpController = TestBed.inject(HttpTestingController);
  });

  it(
    'should throw error message',
    waitForAsync(() => {
      const testUrl = '/test';
      const message =
        'Error Code: 401,  Message: Http failure response for /test: 401 ';
      httpClient.get(testUrl).subscribe(
        (_res) => fail('should have failed with 401 error'),
        (error) => {
          expect(error).toEqual(message);
        }
      );

      const request = httpController.expectOne(testUrl);
      request.flush('error', {
        status: 401,
        statusText: '',
      });
    })
  );
});
