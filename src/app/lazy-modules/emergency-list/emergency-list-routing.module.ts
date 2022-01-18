import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmergencyListComponent } from './emergency-list.component';

const routes: Routes = [
  {
    path: '',
    component: EmergencyListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmergencyRoutingModule {}
