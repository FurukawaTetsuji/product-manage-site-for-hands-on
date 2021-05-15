import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { CoreModule } from 'src/app/core/core.module';
import { MaterialModule } from 'src/app/material/material.module';
import { NgxTranslateModule } from 'src/app/ngx-translate/ngx-translate.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { DummyPurchasingPageRoutingModule } from './dummy-purchasing-page-routing.module';
import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

@NgModule({
  declarations: [DummyPurchasingPageComponent],
  imports: [
    CommonModule,
    DummyPurchasingPageRoutingModule,
    MaterialModule,
    NgxUpperCaseDirectiveModule,
    ReactiveFormsModule,
    CoreModule,
    SharedModule,
    NgxTranslateModule
  ]
})
export class DummyPurchasingPageModule {}
