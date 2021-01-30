import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material/material.module';
import { NgxTranslateModule } from '../ngx-translate/ngx-translate.module';
import { ErrorMessagingComponent } from './components/error-messaging/error-messaging.component';
import { LoadingComponent } from './components/loading/loading.component';
import { MatDatepickerComponent } from './components/mat-datepicker/mat-datepicker.component';
import {
    SuccessMessagingComponent
} from './components/success-messaging/success-messaging.component';
import { YesNoDialogComponent } from './components/yes-no-dialog/yes-no-dialog.component';
import { FormattedCurrencyInputDirective } from './directives/formatted-currency-input.directive';
import { FormattedNumberInputDirective } from './directives/formatted-number-input.directive';
import { XhrInterceptor } from './interceptors/xhr.interceptor';
import { FormattedCurrencyPipe } from './pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from './pipes/formatted-number.pipe';

@NgModule({
  declarations: [
    LoadingComponent,
    ErrorMessagingComponent,
    YesNoDialogComponent,
    FormattedNumberPipe,
    FormattedCurrencyPipe,
    MatDatepickerComponent,
    FormattedNumberInputDirective,
    FormattedCurrencyInputDirective,
    SuccessMessagingComponent
  ],
  imports: [CommonModule, MaterialModule, NgxTranslateModule, ReactiveFormsModule],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  entryComponents: [YesNoDialogComponent],
  exports: [
    LoadingComponent,
    ErrorMessagingComponent,
    YesNoDialogComponent,
    FormattedNumberPipe,
    FormattedCurrencyPipe,
    MatDatepickerComponent,
    FormattedNumberInputDirective,
    FormattedCurrencyInputDirective,
    SuccessMessagingComponent
  ]
})
export class CoreModule {}
