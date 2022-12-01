import { TranslateTestingModule } from 'ngx-translate-testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { ErrorMessagingService } from '../../services/error-messaging.service';
import { ErrorMessagingComponent } from './error-messaging.component';

describe('ErrorMessagingComponent', () => {
  let component: ErrorMessagingComponent;
  let fixture: ComponentFixture<ErrorMessagingComponent>;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; getMessageProperty: jasmine.Spy };

  beforeEach(async () => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'getMessageProperty'
    ]);
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })],
      providers: [{ provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }],
      declarations: [ErrorMessagingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ErrorMessagingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should init', () => {
      component.ngOnInit();
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBeGreaterThan(1);
    });

    it('should error dipslay message', () => {
      const errorMessageProperty = 'errMessage.http.badRequest';
      const expectedValue = '入力情報が正しくありません。';

      errorMessagingServiceSpy.getMessageProperty.and.returnValue(errorMessageProperty);
      fixture.detectChanges();

      const htmlParagraphElement: HTMLParagraphElement = fixture.debugElement.query(By.css('p')).nativeElement;
      expect(htmlParagraphElement.innerText).toEqual(expectedValue);
    });
  });
});
