import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DummyPurchasingPageRoutingModule } from './dummy-purchasing-page-routing.module';
import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';


@NgModule({
  declarations: [DummyPurchasingPageComponent],
  imports: [
    CommonModule,
    DummyPurchasingPageRoutingModule
  ]
})
export class DummyPurchasingPageModule { }
