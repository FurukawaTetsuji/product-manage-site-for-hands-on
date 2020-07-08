import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../constants/api-const';
import { SignInRequestDto } from '../models/dtos/requests/sign-in-request-dto';
import { SignInResponseDto } from '../models/dtos/responses/sign-in-response-dto';
import { User } from '../models/user';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;
  let httpTestingController: HttpTestingController;
  let errorMessagingServiceSpy: { setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', ['setupPageErrorMessageFromResponse']);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }]
    });
    service = TestBed.inject(AccountService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // After every test, assert that there are no more pending requests.
    httpTestingController.verify();
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#signIn', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_SIGN_IN;

    it('should return expected response', () => {
      const signInRequestDto: SignInRequestDto = createSignInRequestDto();
      const expectedSignInResponseDto: SignInResponseDto = createExpectedSignInResponseDto();

      // Subscribes to api.
      service.signIn(signInRequestDto).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toEqual(expectedSignInResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      // Responds with the mock.
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(expectedSignInResponseDto);
    });

    it('should return null when response is 401 Unauthorized error', () => {
      const signInRequestDto: SignInRequestDto = createSignInRequestDto();
      const errorStatus = 401;
      const errorMessage = '401 Unauthorized';

      // Subscribes to api.
      service.signIn(signInRequestDto).subscribe((signInResponseDto) => {
        expect(signInResponseDto).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      // Responds with the mock
      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('POST');
      req.flush(errorMessage, { status: errorStatus, statusText: errorMessage });
    });
  });

  describe('#getUser,#setUser', () => {
    it('should return expected data', () => {
      const user: User = createUser();
      service.setUser(user);
      assertUser(service, service.getUser());
    });
  });

  describe('#removeUser', () => {
    it('should remove user', () => {
      const user: User = createUser();
      service.setUser(user);
      assertUser(service, service.getUser());

      service.removeUser();
      expect(service.getUser()).toBeNull();
    });
  });
});

function createSignInRequestDto() {
  return { Username: 'Username', Password: 'Password' };
}

function createExpectedSignInResponseDto() {
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

function createUser() {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userName = 'userName';
  user.userLocale = 'ja-JP';
  user.userLanguage = 'ja';
  user.userTimezone = 'Asia/Tokyo';
  user.userTimezoneOffset = '+0900';
  user.userCurrency = 'JPY';
  return user;
}

function assertUser(accountService: AccountService, user: User) {
  expect(accountService.getUser().userAccount).toEqual(user.userAccount);
  expect(accountService.getUser().userName).toEqual(user.userName);
  expect(accountService.getUser().userLocale).toEqual(user.userLocale);
  expect(accountService.getUser().userLanguage).toEqual(user.userLanguage);
  expect(accountService.getUser().userTimezone).toEqual(user.userTimezone);
  expect(accountService.getUser().userTimezoneOffset).toEqual(user.userTimezoneOffset);
  expect(accountService.getUser().userCurrency).toEqual(user.userCurrency);
}
