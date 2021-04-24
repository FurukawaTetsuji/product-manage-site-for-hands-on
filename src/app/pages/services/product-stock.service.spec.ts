import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { SuccessMessagingService } from 'src/app/core/services/success-messaging.service';

import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../constants/api-const';
import { ProductStockRequestDto } from '../models/dtos/requests/product-stock-request-dto';
import { ProductStockResponseDto } from '../models/dtos/responses/product-stock-response-dto';
import { ProductStockService } from './product-stock.service';

describe('ProductStockService', () => {
  const expectedProductStockResponseDto: ProductStockResponseDto = createProductStockResponseDto();

  let service: ProductStockService;
  let httpTestingController: HttpTestingController;
  let successMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setMessageProperty: jasmine.Spy };
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    successMessagingServiceSpy = jasmine.createSpyObj('SuccessMessagingService', [
      'clearMessageProperty',
      'setMessageProperty'
    ]);
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'setupPageErrorMessageFromResponse'
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: SuccessMessagingService, useValue: successMessagingServiceSpy },
        { provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }
      ]
    });
    service = TestBed.inject(ProductStockService);
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

  describe('#getProductStock', () => {
    const testProductCode = 'ABCD123';
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK + '?productCode=' + testProductCode;

    it('should return expected response', () => {
      service.getProductStock(testProductCode).subscribe((response) => {
        expect(response).toEqual(expectedProductStockResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedProductStockResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProductStock(testProductCode).subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#updateProductStock', () => {
    const productStockRequestDto = createProductStockRequestDto();
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;

    it('should return expected response', () => {
      service.updateProductStock(productStockRequestDto).subscribe((response) => {
        expect(response).toEqual(expectedProductStockResponseDto);
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(1);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedProductStockResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.updateProductStock(productStockRequestDto).subscribe((response) => {
        expect(response).toBeNull();
        expect(successMessagingServiceSpy.setMessageProperty.calls.count()).toBe(0);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('PUT');
      expect(successMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});

function createProductStockRequestDto(): ProductStockRequestDto {
  const expectedProductStockRequestDto: ProductStockRequestDto = {
    productCode: 'productCode',
    productStockQuantity: 100,
    addProductStockQuantity: 50
  };
  return expectedProductStockRequestDto;
}

function createProductStockResponseDto(): ProductStockResponseDto {
  const expectedProductStockResponseDto: ProductStockResponseDto = {
    productCode: 'productCode',
    productColor: 'productColor',
    productGenre: '1',
    productImage: 'productImage',
    productName: 'productName',
    productSizeStandard: 'productSizeStandard',
    productStockQuantity: 1
  };
  return expectedProductStockResponseDto;
}
