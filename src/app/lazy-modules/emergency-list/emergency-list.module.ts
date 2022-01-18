import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableModule } from 'primeng/table';

import { EmergencyListComponent } from './emergency-list.component';
import { EmergencyRoutingModule } from './emergency-list-routing.module';

@NgModule({
  imports: [CommonModule, EmergencyRoutingModule, TableModule],
  exports: [EmergencyListComponent],
  declarations: [EmergencyListComponent],
})
export class EmergencyListModule {}
