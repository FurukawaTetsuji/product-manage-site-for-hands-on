import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import {
    ProductListingPageComponent
} from './components/product-listing-page/product-listing-page.component';
import {
    ProductRegisteringPageComponent
} from './components/product-registering-page/product-registering-page.component';
import {
    PurchaseHistoryListingPageComponent
} from './components/purchase-history-listing-page/purchase-history-listing-page.component';
import { SignInPageComponent } from './components/sign-in-page/sign-in-page.component';
import {
    StockRegisteringPageComponent
} from './components/stock-registering-page/stock-registering-page.component';

@NgModule({
  declarations: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent
  ],
  imports: [CoreModule, CommonModule, HttpClientModule, MaterialModule, NgxTranslateModule, ReactiveFormsModule],
  exports: [
    SignInPageComponent,
    ProductListingPageComponent,
    ProductRegisteringPageComponent,
    StockRegisteringPageComponent,
    PurchaseHistoryListingPageComponent
  ]
})
export class PagesModule {}
