import { CommonModule, registerLocaleData } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import localeDe from '@angular/common/locales/de';
import localeFr from '@angular/common/locales/fr';
import localeJa from '@angular/common/locales/ja';
import { LOCALE_ID, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

registerLocaleData(localeJa);
registerLocaleData(localeFr);
registerLocaleData(localeDe);

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    { provide: LOCALE_ID, useValue: 'ja-JP' },
    { provide: LOCALE_ID, useValue: 'en-US' },
    { provide: LOCALE_ID, useValue: 'fr-FR' },
    { provide: LOCALE_ID, useValue: 'de-DE' }
  ],
  exports: [TranslateModule]
})
export class NgxTranslateModule {}
