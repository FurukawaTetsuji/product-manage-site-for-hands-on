import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
    ProductListingPageComponent
} from './pages/components/product-listing-page/product-listing-page.component';
import {
    ProductRegisteringPageComponent
} from './pages/components/product-registering-page/product-registering-page.component';
import {
    PurchaseHistoryListingPageComponent
} from './pages/components/purchase-history-listing-page/purchase-history-listing-page.component';
import { SignInPageComponent } from './pages/components/sign-in-page/sign-in-page.component';
import {
    StockRegisteringPageComponent
} from './pages/components/stock-registering-page/stock-registering-page.component';
import { UrlConst } from './pages/constants/url-const';
import { AuthGuard } from './pages/guards/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: UrlConst.SLASH + UrlConst.PATH_SIGN_IN, pathMatch: 'full' },
  { path: UrlConst.PATH_SIGN_IN, component: SignInPageComponent },
  { path: UrlConst.PATH_PRODUCT_LISTING, component: ProductListingPageComponent, canActivate: [AuthGuard] },
  { path: UrlConst.PATH_PRODUCT_REGISTERING_NEW, component: ProductRegisteringPageComponent, canActivate: [AuthGuard] },
  {
    path: UrlConst.PATH_PRODUCT_REGISTERING + UrlConst.SLASH + ':productCode',
    component: ProductRegisteringPageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: UrlConst.PATH_PURCHASE_HISTORY_LISTING,
    component: PurchaseHistoryListingPageComponent,
    canActivate: [AuthGuard]
  },
  { path: UrlConst.PATH_STOCK_REGISTERING, component: StockRegisteringPageComponent, canActivate: [AuthGuard] },
  {
    path: UrlConst.PATH_DUMMY_PURCHASING,
    loadChildren: () =>
      import('./super-user-pages/dummy-purchasing-page/dummy-purchasing-page.module').then(
        (m) => m.DummyPurchasingPageModule
      ),
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
