import { TranslateTestingModule } from 'ngx-translate-testing';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessMessagingService } from '../../services/success-messaging.service';
import { SuccessMessagingComponent } from './success-messaging.component';

describe('SuccessMessagingComponent', () => {
  let component: SuccessMessagingComponent;
  let fixture: ComponentFixture<SuccessMessagingComponent>;
  let successMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; getMessageProperty: jasmine.Spy };

  beforeEach(async () => {
    successMessagingServiceSpy = jasmine.createSpyObj('SuccessMessagingService', [
      'clearMessageProperty',
      'getMessageProperty'
    ]);
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') })],
      providers: [{ provide: SuccessMessagingService, useValue: successMessagingServiceSpy }],
      declarations: [SuccessMessagingComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SuccessMessagingComponent);
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
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBeGreaterThan(1);
    });
  });
});
