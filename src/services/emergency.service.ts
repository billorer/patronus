import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { RawData } from 'src/models/rawdata.interface';

import { Emergency } from '../models/emergency.interface';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  constructor(private httpClient: HttpClient) {}

  getEmergencies(): Observable<Emergency[]> {
    return this.httpClient
      .get<{ content: RawData[] }>('/getAllEmergencies')
      .pipe(
        map((data: { content: RawData[] }) => data.content),
        map((data: RawData[]) => data.map(this.mapDataToEmergency))
      );
  }

  private mapDataToEmergency(data: RawData): Emergency {
    return {
      emergencyId: data.emergency.emergencyId,
      requestTime: data.emergency.requestTime,
      device: data.device,
      user: data.holder,
    };
  }
}
