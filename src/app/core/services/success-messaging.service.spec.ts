import { TestBed } from '@angular/core/testing';

import { SuccessMessagingService } from './success-messaging.service';

describe('SuccessMessagingService', () => {
  let service: SuccessMessagingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuccessMessagingService);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#setMessageProperty,#getMessageProperty', () => {
    it('should set property', () => {
      const expectedValue = 'messageProperty';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
    });
  });

  describe('#clearMessageProperty', () => {
    it('should clear value', () => {
      const expectedValue = 'messageProperty';
      service.setMessageProperty(expectedValue);
      expect(service.getMessageProperty()).toEqual(expectedValue);
      service.clearMessageProperty();
      expect(service.getMessageProperty()).toEqual('');
    });
  });

  describe('#hideStart', () => {
    it('should hide', () => {
      jasmine.clock().install();
      const initialValue = 'messageProperty';
      service.setMessageProperty(initialValue);
      jasmine.clock().tick(5000);
      expect(service.getMessageProperty()).toEqual('');
      jasmine.clock().uninstall();
    });
  });
});
