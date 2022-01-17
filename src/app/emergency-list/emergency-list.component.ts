import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Emergency } from 'src/models/emergency.interface';
import { EmergencyService } from 'src/services/emergency.service';
import { emergencyDateFormatter } from 'src/utils/emergency.utils';

@Component({
  selector: 'app-emergency-list',
  templateUrl: './emergency-list.component.html',
  styleUrls: ['./emergency-list.component.scss'],
})
export class EmergencyListComponent implements OnInit {
  public emergencies: Emergency[] = [];

  constructor(
    private emergencyService: EmergencyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.emergencyService
      .getEmergencies()
      .pipe(
        tap((emergencies) => (this.emergencies = emergencies)),
        catchError((err) => {
          this.router.navigate(['/not-found']);
          return of(err);
        })
      )
      .subscribe();
  }

  public formatEmergencyDate(date: string): string {
    return emergencyDateFormatter.format(Date.parse(date));
  }

  public formatEmergencyId(id: string): string {
    return id.slice(0, 8);
  }
}
