import { UrlConst } from 'src/app/pages/constants/url-const';

import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { RoutingService } from './routing.service';

describe('RoutingService', () => {
  let service: RoutingService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.inject(RoutingService);
    router = TestBed.inject(Router);
  });

  describe('#constractor', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  describe('#navigate', () => {
    it('should be navigated to sign in page', () => {
      spyOn(router, 'navigate');
      service.navigate(UrlConst.PATH_SIGN_IN);
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_SIGN_IN]);
    });
  });
});
