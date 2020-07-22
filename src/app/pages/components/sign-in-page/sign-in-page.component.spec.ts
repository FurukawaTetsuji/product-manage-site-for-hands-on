import { TranslateTestingModule } from 'ngx-translate-testing';
import { of } from 'rxjs';
import { MaterialModule } from 'src/app/material/material.module';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/testing/html-element-utility';

import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UrlConst } from '../../constants/url-const';
import { SignInRequestDto } from '../../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../../models/dtos/responses/sign-in-response-dto';
import { AccountService } from '../../services/account.service';
import { SignInPageComponent } from './sign-in-page.component';

describe('SignInPageComponent', () => {
  const expectedSignInRequestDto: SignInRequestDto = createExpectedRequestDto();
  const expectedSignInResponseDto: SignInResponseDto = createExpectedResponseDto();
  let component: SignInPageComponent;
  let fixture: ComponentFixture<SignInPageComponent>;
  let accountServiceSpy: { signIn: jasmine.Spy; setUser: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let router: Router;

  beforeEach(async(() => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['signIn', 'setUser']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy }
      ],
      declarations: [SignInPageComponent]
    }).compileComponents();
    router = TestBed.inject(Router);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    setupBrowserLanguage('ja');
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#singnIn', () => {
    it('should not sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(null));
      component.clickSignInButton();
      expect(accountServiceSpy.setUser.calls.count()).toEqual(0);
    });

    it('should sign in', () => {
      accountServiceSpy.signIn.and.returnValue(of(expectedSignInResponseDto));
      spyOn(router, 'navigate');

      component.clickSignInButton();

      expect(accountServiceSpy.setUser.calls.count()).toEqual(1);
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_PRODUCT_LISTING]);
    });
  });

  describe('#getLanguage', () => {
    const privateMethodName = 'getLanguage';

    it('lang without hypen', () => {
      const language = 'ja';
      const expectedLanguage = 'ja';
      expect(component[privateMethodName](language)).toEqual(expectedLanguage);
    });

    it('lang with hypen', () => {
      const language = 'ja-JP';
      const expectedLanguage = 'ja';
      expect(component[privateMethodName](language)).toEqual(expectedLanguage);
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('.sign-in-title-wrapper'))
        .nativeElement;
      expect(htmlInputElement.innerText).toContain('EXAPMLE SITE');
    });

    it('sign in user account', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#signin-user-account'))
        .nativeElement;
      expect(htmlInputElement.dataset.placeholder).toContain('ユーザアカウント');
    });
    it('sign in user password', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#signin-user-password'))
        .nativeElement;
      expect(htmlInputElement.dataset.placeholder).toContain('パスワード');
    });
    it('saveBtn', () => {
      const htmlInputElement: HTMLInputElement = fixture.debugElement.query(By.css('#sign-in-button')).nativeElement;
      expect(htmlInputElement.innerText).toContain('サインイン');
    });
  });

  describe('DOM input test', () => {
    it('sign in user account', () => {
      const expectedValue = 'Username';
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', expectedValue);
      expect(component.signInUserAccount.value).toEqual(expectedValue);
    });
    it('sign in user password', () => {
      const expectedValue = 'Password';
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-password', expectedValue);
      expect(component.signInUserPassword.value).toEqual(expectedValue);
    });
  });

  describe('DOM input validation test', () => {
    it('sign in user account', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', '');
      const validationError = fixture.debugElement.query(By.css('.validation-error')).nativeElement;
      expect(validationError).toBeTruthy();
    });
    it('sign in user password', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-password', '');
      const validationError = fixture.debugElement.query(By.css('.validation-error')).nativeElement;
      expect(validationError).toBeTruthy();
    });
  });

  describe('DOM input test', () => {
    it('Should Enter input and create request', () => {
      HtmlElementUtility.setValueToHTMLInputElement(fixture, '#signin-user-account', expectedSignInRequestDto.Username);
      HtmlElementUtility.setValueToHTMLInputElement(
        fixture,
        '#signin-user-password',
        expectedSignInRequestDto.Password
      );
      const privateMethodName = 'createSignInRequestDto';
      const signInRequestDto: SignInRequestDto = component[privateMethodName]();
      expect(signInRequestDto).toEqual(expectedSignInRequestDto);
    });
  });
});

function createExpectedRequestDto(): SignInRequestDto {
  return { Username: 'Username', Password: 'Password' };
}

function createExpectedResponseDto(): SignInResponseDto {
  return {
    userAccount: 'userAccount',
    userName: 'userName',
    userLocale: 'ja-JP',
    userLanguage: 'ja',
    userTimezone: 'Asia/Tokyo',
    userTimezoneOffset: '+0900',
    userCurrency: 'JPY'
  };
}

function setupBrowserLanguage(language: string) {
  const defineGetter = '__defineGetter__';
  window.navigator[defineGetter]('language', () => {
    return language;
  });
}
