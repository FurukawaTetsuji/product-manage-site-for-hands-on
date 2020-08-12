import { AppConst } from 'src/app/pages/constants/app-const';
import { User } from 'src/app/pages/models/user';

import { TestBed } from '@angular/core/testing';

import { SessionStorageService } from './session-storage.service';

describe('SessionStorageService', () => {
  let service: SessionStorageService;
  let expectedUser: User;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SessionStorageService);
    expectedUser = createUser();
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setItem, #getItem', () => {
    it('should set and get item', () => {
      SessionStorageService.setItem(AppConst.STORAGE_KEY_USER, expectedUser);
      const resultUser: User = SessionStorageService.getItem(AppConst.STORAGE_KEY_USER, new User());
      expect(resultUser.userAccount).toEqual(expectedUser.userAccount);
      expect(resultUser.userName).toEqual(expectedUser.userName);
      expect(resultUser.userLocale).toEqual(expectedUser.userLocale);
      expect(resultUser.userLanguage).toEqual(expectedUser.userLanguage);
      expect(resultUser.userTimezone).toEqual(expectedUser.userTimezone);
      expect(resultUser.userTimezoneOffset).toEqual(expectedUser.userTimezoneOffset);
      expect(resultUser.userCurrency).toEqual(expectedUser.userCurrency);
    });
  });

  describe('#removeItem', () => {
    it('should remove item', () => {
      SessionStorageService.setItem(AppConst.STORAGE_KEY_USER, expectedUser);
      SessionStorageService.removeItem(AppConst.STORAGE_KEY_USER);
      expect(SessionStorageService.getItem(AppConst.STORAGE_KEY_USER, new User())).toBeNull();
    });
  });
});

function createUser(): User {
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
