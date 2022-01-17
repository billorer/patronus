import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Emergency } from 'src/models/emergency.interface';
import { EmergencyService } from './emergency.service';

describe('EmergencyService', () => {
  let httpTestingController: HttpTestingController;
  let emergencyService: EmergencyService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmergencyService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    emergencyService = TestBed.get(EmergencyService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should return emergencies', () => {
    const curDate = new Date();
    const rawEmergencies = {
      content: [
        {
          emergency: {
            emergencyId: 'id',
            requestTime: curDate,
          },
          device: {
            serialNumber: 'sew2',
          },
          holder: {
            firstName: 'John',
            lastName: 'Wick',
          },
        },
      ],
    };

    const expectedEmergencies = [
      {
        emergencyId: 'id',
        requestTime: curDate,
        device: {
          serialNumber: 'sew2',
        },
        user: {
          firstName: 'John',
          lastName: 'Wick',
        },
      } as Emergency,
    ];

    emergencyService.getEmergencies().subscribe((emergencies) => {
      expect(emergencies).toEqual(
        expectedEmergencies,
        'should return expected employees'
      );
    }, fail);

    const req = httpTestingController.expectOne('/getAllEmergencies');
    expect(req.request.method).toEqual('GET');

    req.flush(rawEmergencies);
  });
});
