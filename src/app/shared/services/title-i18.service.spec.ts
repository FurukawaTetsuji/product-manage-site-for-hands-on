import { TranslateTestingModule } from 'ngx-translate-testing';

import { TestBed } from '@angular/core/testing';

import { TitleI18Service } from './title-i18.service';

describe('TitleI18Service', () => {
  let service: TitleI18Service;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })]
    });
    service = TestBed.inject(TitleI18Service);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setTitle', () => {
    it('should set title', () => {
      const screenName = 'sign-in';
      const expectedTitleSystem = '【Example Site】';
      const expectedTitleSub = 'ログイン';

      service.setTitle(screenName);
      expect(service.title.getTitle()).toEqual(expectedTitleSystem + expectedTitleSub);
    });
  });
});
