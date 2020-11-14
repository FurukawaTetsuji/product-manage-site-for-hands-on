import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';

import { HttpParams } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { ApiConst } from '../constants/api-const';
import {
    ProductSearchListResponseDto
} from '../models/dtos/responses/product-search-list-response-dto';
import { ProductSearchResponseDto } from '../models/dtos/responses/product-search-response-dto';
import { ProductService } from './product.service';

describe('ProductService', () => {
  const expectedProductSearchResponseDto: ProductSearchResponseDto = createProductSearchResponseDto();
  const expectedProductSearchListResponseDto: ProductSearchListResponseDto = createProductSearchListResponseDto(
    expectedProductSearchResponseDto
  );
  const expectedGenresArrayResponse: string[] = createGenresArray();

  let service: ProductService;
  let httpTestingController: HttpTestingController;
  let errorMessagingServiceSpy: { clearMessageProperty: jasmine.Spy; setupPageErrorMessageFromResponse: jasmine.Spy };

  beforeEach(() => {
    errorMessagingServiceSpy = jasmine.createSpyObj('ErrorMessagingService', [
      'clearMessageProperty',
      'setupPageErrorMessageFromResponse'
    ]);
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: ErrorMessagingService, useValue: errorMessagingServiceSpy }]
    });
    service = TestBed.inject(ProductService);
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

  describe('#getProductList', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT_SEARCH;

    it('should return expected response', () => {
      service.getProductList(new HttpParams()).subscribe((response) => {
        expect(response).toEqual(expectedProductSearchListResponseDto);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedProductSearchListResponseDto);
    });

    it('should return null 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getProductList(new HttpParams()).subscribe((response) => {
        expect(response).toBeNull();
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });

  describe('#getGenres', () => {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_GENRE;

    it('should return expected response', () => {
      service.getGenres().subscribe((response) => {
        expect(response).toEqual(expectedGenresArrayResponse);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(0);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(expectedGenresArrayResponse);
    });

    it('should return [] 404 Not Found', () => {
      const msg = '404 Not Found';
      service.getGenres().subscribe((response) => {
        expect(response).toEqual([]);
        expect(errorMessagingServiceSpy.setupPageErrorMessageFromResponse.calls.count()).toBe(1);
      }, fail);

      const req = httpTestingController.expectOne(webApiUrl);
      expect(req.request.method).toEqual('GET');
      expect(errorMessagingServiceSpy.clearMessageProperty.calls.count()).toBe(1);

      // Respond with the mock
      req.flush(msg, { status: 404, statusText: '404 Not Found' });
    });
  });
});

function createProductSearchResponseDto(): ProductSearchResponseDto {
  return {
    no: 1,
    productName: 'productName',
    productCode: 'productCode',
    productGenre: '1',
    productImageUrl: 'productImageUrl',
    productSizeStandard: 'productSizeStandard',
    productColor: 'productColor',
    productUnitPrice: 1,
    productStockQuantity: 1,
    endOfSale: false
  };
}

function createProductSearchListResponseDto(
  expectedProductSearchResponseDto: ProductSearchResponseDto
): ProductSearchListResponseDto {
  return {
    productSearchResponseDtos: Array(expectedProductSearchResponseDto),
    pageIndex: 0,
    resultsLength: 1
  };
}

function createGenresArray(): string[] {
  return Array('1', '2', '3');
}
