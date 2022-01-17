import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of, throwError } from 'rxjs';
import { EmergencyService } from 'src/services/emergency.service';

import { EmergencyListComponent } from './emergency-list.component';

class MockEmergencyService {
  getEmergencies() {
    return of({ content: [] });
  }
}

describe('EmergencyListComponent', () => {
  let component: EmergencyListComponent;
  let fixture: ComponentFixture<EmergencyListComponent>;
  let mockEmergencyService: MockEmergencyService;
  let router: Router;

  beforeEach(async () => {
    mockEmergencyService = new MockEmergencyService();
    await TestBed.configureTestingModule({
      declarations: [EmergencyListComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        {
          provide: EmergencyService,
          useValue: mockEmergencyService,
        },
      ],
    }).compileComponents();
    router = TestBed.get(Router);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmergencyListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getEmergencies during onInit', () => {
    const spy = spyOn(mockEmergencyService, 'getEmergencies').and.returnValue(
      of({ content: [] })
    );
    component.ngOnInit();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('should set emergencies and display in table', () => {
    const emergency = {
      emergencyId: 'id',
      requestTime: new Date(),
      device: {
        serialNumber: 'sew2',
      },
      user: {
        firstName: 'John',
        lastName: 'Wick',
      },
    };

    const spy = spyOn(mockEmergencyService, 'getEmergencies').and.returnValue(
      of([emergency] as any)
    );
    component.ngOnInit();
    fixture.detectChanges();
    expect(spy).toHaveBeenCalledTimes(1);

    const table = fixture.debugElement.query(By.css('.emergency-table'));
    expect(table.properties['value']).toEqual([emergency]);
  });

  it('should navigate the user to not-found page', () => {
    const spy = spyOn(mockEmergencyService, 'getEmergencies').and.returnValue(
      throwError('')
    );
    const navigateSpy = spyOn(router, 'navigate');

    component.ngOnInit();
    fixture.detectChanges();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(navigateSpy).toHaveBeenCalledWith(['/not-found']);
  });
});
