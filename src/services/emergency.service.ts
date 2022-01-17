import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Emergency } from '../models/emergency.interface';

@Injectable({
  providedIn: 'root',
})
export class EmergencyService {
  constructor(private httpClient: HttpClient) {}

  getEmergencies(): Observable<Emergency[]> {
    return this.httpClient.get<{ content: any[] }>('/getAllEmergencies').pipe(
      map((data: { content: any[] }) => data.content),
      map((data: any[]) =>
        data.map((d) => ({
          emergencyId: d.emergency.emergencyId,
          requestTime: d.emergency.requestTime,
          device: d.device,
          user: d.holder,
        }))
      )
    );
    // return new Observable((subscriber) => {
    //   subscriber.next([
    //     {
    //       id: '1',
    //       date: new Date(),
    //       device: {
    //         serialNumber: '123',
    //       },
    //       user: {
    //         firstName: 'Johnny',
    //         lastName: 'Cage',
    //       },
    //     } as Emergency,
    //     {
    //       id: '2',
    //       date: new Date(),
    //       device: {
    //         serialNumber: '456',
    //       },
    //       user: {
    //         firstName: 'Maria',
    //         lastName: 'Cage',
    //       },
    //     } as Emergency,
    //   ]);
    // });
  }
}
