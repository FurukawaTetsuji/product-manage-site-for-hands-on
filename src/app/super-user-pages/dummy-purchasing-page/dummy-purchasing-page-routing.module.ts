import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DummyPurchasingPageComponent } from './dummy-purchasing-page.component';

const routes: Routes = [{ path: '', component: DummyPurchasingPageComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DummyPurchasingPageRoutingModule { }
