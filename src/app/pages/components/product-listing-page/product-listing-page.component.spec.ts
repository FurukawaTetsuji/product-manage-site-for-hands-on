import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { FormattedNumberPipe } from 'src/app/core/pipes/formatted-number.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/testing/html-element-utility';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { UrlConst } from '../../constants/url-const';
import {
    ProductListingSearchParamsDto
} from '../../models/dtos/requests/product-listing-search-params-dto';
import {
    ProductSearchListResponseDto
} from '../../models/dtos/responses/product-search-list-response-dto';
import { ProductSearchResponseDto } from '../../models/dtos/responses/product-search-response-dto';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import { SearchParamsService } from '../../services/search-params.service';
import { ProductListingPageComponent } from './product-listing-page.component';

/** Frequently used values */
const VALUE_PRODUCT_CODE_UPPER = 'PRODUCTCODE';
const VALUE_PRODUCT_CODE_LOWER = 'productCode';
const VALUE_PRODUCT_NAME = 'productName';
const VALUE_PRODUCT_GENRE = '1';
const VALUE_END_OF_SALE_TRUE = true;
const VALUE_PAGE_INDEX = 0;
const VALUE_PAGE_SIZE = 50;

describe('ProductListingPageComponent', () => {
  /** Expected values */
  const expectedUser = createExpectedUser();
  const expectedGenres = createExpectedGenres();
  const expectedSearchParamsDto = createExpectedSearchParamsDto();
  const expectedSearchParamsDtoRequired = createExpectedSearchParamsDtoRequired();
  const expectedSearchListResponseDto = createExpectedSearchListResponseDto();

  let component: ProductListingPageComponent;
  let fixture: ComponentFixture<ProductListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: { getGenres: jasmine.Spy; getProductList: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let searchParamsServiceSpy: {
    getProductListingSearchParamsDto: jasmine.Spy;
    removeProductListingSearchParamsDto: jasmine.Spy;
    setProductListingSearchParamsDto: jasmine.Spy;
  };
  let router: Router;

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', ['getGenres', 'getProductList']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    searchParamsServiceSpy = jasmine.createSpyObj('SearchParamsService', [
      'getProductListingSearchParamsDto',
      'setProductListingSearchParamsDto',
      'removeProductListingSearchParamsDto'
    ]);
    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        NgxUpperCaseDirectiveModule
      ],
      providers: [
        FormBuilder,
        FormattedNumberPipe,
        FormattedCurrencyPipe,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        { provide: SearchParamsService, useValue: searchParamsServiceSpy }
      ],
      declarations: [ProductListingPageComponent, FormattedNumberPipe, FormattedCurrencyPipe]
    }).compileComponents();
    router = TestBed.inject(Router);

    accountServiceSpy.getUser.and.returnValue(expectedUser);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    searchParamsServiceSpy.getProductListingSearchParamsDto.and.returnValue(null);
    productServiceSpy.getProductList.and.returnValue(of(expectedSearchListResponseDto));
    fixture = TestBed.createComponent(ProductListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should get genre on init', () => {
      component.ngOnInit();
      expect(component.genres).toEqual(expectedGenres);
    });
    it('should set user lang to default of translate service on init', () => {
      component.ngOnInit();
      expect(component.translateService.getDefaultLang()).toEqual(expectedUser.userLanguage);
    });
  });

  describe('#ngAfterViewInit', () => {
    describe('When SearchParamsDto is not registered in SearchParamsService', () => {
      it('should not change from the initial search criteria', () => {
        component.ngAfterViewInit();
        expect(component.productName.value).toEqual('');
        expect(component.productCode.value).toEqual('');
        expect(component.productGenre.value).toEqual('');
        expect(component.endOfSale.value).toBeFalsy();
        expect(component.paginator.pageIndex).toEqual(VALUE_PAGE_INDEX);
        expect(component.paginator.pageSize).toEqual(VALUE_PAGE_SIZE);
      });
      it('should not perform a search', () => {
        spyOn(component, 'clickSearchButton').and.callThrough();
        component.ngAfterViewInit();
        expect(component.clickSearchButton).toHaveBeenCalledTimes(0);
      });
    });

    describe('When SearchParamsDto is registered in SearchParamsService', () => {
      it('should overwrite search criteria', () => {
        searchParamsServiceSpy.getProductListingSearchParamsDto.and.returnValue(expectedSearchParamsDto);
        component.ngAfterViewInit();
        expect(component.productName.value).toEqual(expectedSearchParamsDto.productName);
        expect(component.productCode.value).toEqual(expectedSearchParamsDto.productCode);
        expect(component.productGenre.value).toEqual(expectedSearchParamsDto.productGenre);
        expect(component.endOfSale.value).toEqual(expectedSearchParamsDto.endOfSale);
        expect(component.paginator.pageIndex).toEqual(expectedSearchParamsDto.pageIndex);
        expect(component.paginator.pageSize).toEqual(expectedSearchParamsDto.pageSize);
      });

      it('should set search conditions correctly even if only the required conditions are used', () => {
        searchParamsServiceSpy.getProductListingSearchParamsDto.and.returnValue(expectedSearchParamsDtoRequired);
        component.ngAfterViewInit();
        expect(component.productName.value).toEqual('');
        expect(component.productCode.value).toEqual('');
        expect(component.productGenre.value).toEqual('');
        expect(component.paginator.pageIndex).toEqual(expectedSearchParamsDto.pageIndex);
        expect(component.paginator.pageSize).toEqual(expectedSearchParamsDto.pageSize);
      });

      it('should perform a search', () => {
        searchParamsServiceSpy.getProductListingSearchParamsDto.and.returnValue(expectedSearchParamsDto);
        spyOn(component, 'clickSearchButton').and.callThrough();
        component.ngAfterViewInit();
        expect(component.clickSearchButton).toHaveBeenCalledTimes(1);
      });
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle).toHaveBeenCalled();
    });
  });

  describe('#clickNewButton', () => {
    it('should move to new page', () => {
      spyOn(router, 'navigate').and.returnValue(null);
      component.clickNewButton();
      expect(searchParamsServiceSpy.removeProductListingSearchParamsDto).toHaveBeenCalledTimes(1);
      expect(router.navigate).toHaveBeenCalledWith([UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING_NEW]);
    });
  });

  describe('#clickClearButton', () => {
    it('should clear', () => {
      component.productName.setValue(VALUE_PRODUCT_NAME);
      component.productCode.setValue(VALUE_PRODUCT_CODE_LOWER);
      component.productGenre.setValue(VALUE_PRODUCT_GENRE);
      component.endOfSale.setValue(VALUE_END_OF_SALE_TRUE);
      component.paginator.pageSize = 100;
      component.paginator.pageIndex = 100;
      component.productSearchResponseDtos = expectedSearchListResponseDto.productSearchResponseDtos;
      component.resultsLength = 100;

      component.clickClearButton();

      expect(searchParamsServiceSpy.removeProductListingSearchParamsDto).toHaveBeenCalledTimes(1);
      expect(component.productName.value).toEqual('');
      expect(component.productCode.value).toEqual('');
      expect(component.productGenre.value).toEqual('');
      expect(component.endOfSale.value).toBeFalsy();
      expect(component.paginator.pageIndex).toEqual(0);
      expect(component.paginator.pageSize).toEqual(component.initialPageSize);
      expect(component.productSearchResponseDtos).toBeNull();
      expect(component.resultsLength).toBe(0);
    });
  });

  describe('#clickSearchButton', () => {
    describe('If the page index does not change after searching', () => {
      it('should search normally', () => {
        component.clickSearchButton();
        expect(productServiceSpy.getProductList).toHaveBeenCalledTimes(1);
        expect(component.productSearchResponseDtos).toEqual(expectedSearchListResponseDto.productSearchResponseDtos);
      });
    });
    describe('If the page index change after searching', () => {
      it('should overwrite pagenator page index from response', () => {
        component.paginator.pageIndex = 1;
        component.clickSearchButton();
        expect(component.paginator.pageIndex).toEqual(expectedSearchListResponseDto.pageIndex);
      });
    });
  });

  describe('#clickListRow', () => {
    it('should move to new page', () => {
      spyOn(router, 'navigate').and.returnValue(null);
      component.clickListRow(expectedSearchListResponseDto.productSearchResponseDtos[0]);
      expect(router.navigate).toHaveBeenCalledWith([
        UrlConst.PATH_PRODUCT_REGISTERING,
        expectedSearchListResponseDto.productSearchResponseDtos[0].productCode
      ]);
    });
  });

  describe('#unselectProductGenre', () => {
    it('should unselect genre', () => {
      component.productGenre.setValue(VALUE_PRODUCT_GENRE);
      component.unselectProductGenre();
      expect(component.productGenre.value).toEqual('');
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#title')).nativeElement;
      expect(htmlElement.innerText).toContain('商品一覧');
    });

    it('product name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-name')).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品名');
    });
    it('product code', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-code')).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品コード');
    });
    it('product genre', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#product-genre-label')).nativeElement;
      expect(htmlElement.innerText).toContain('ジャンル');
    });
    it('end of sale', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#end-of-sale')).nativeElement;
      expect(htmlElement.innerText).toContain('販売終了');
    });

    it('new button', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#new-button')).nativeElement;
      expect(htmlElement.innerText).toContain('新規');
    });
    it('clear button', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#clear-button')).nativeElement;
      expect(htmlElement.innerText).toContain('クリア');
    });
    it('search button', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css('#search-button')).nativeElement;
      expect(htmlElement.innerText).toContain('検索');
    });
  });

  describe('DOM input test', () => {
    it('product name', () => {
      const expectedValue = VALUE_PRODUCT_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product code', () => {
      const expectedValue = VALUE_PRODUCT_CODE_LOWER;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-code', expectedValue);
      expect(component.productCode.value).toEqual(expectedValue.toUpperCase());
    });
    it('product genre', () => {
      const expectedValue = VALUE_PRODUCT_GENRE;
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(
        fixture,
        '#product-genre',
        Number(expectedValue)
      );
      expect(component.productGenre.value).toEqual(expectedValue);
    });
    it('end of sale', () => {
      // Clicks checkbox's label
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');
      expect(component.endOfSale.value).toEqual(VALUE_END_OF_SALE_TRUE);
    });
  });

  describe('#createSearchParamsDto', () => {
    it('Should create product listing search params dto correctly', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, '#product-name', VALUE_PRODUCT_NAME);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-code',
        VALUE_PRODUCT_CODE_LOWER
      );
      HtmlElementUtility.setValueToHtmlSelectElement<typeof component>(
        fixture,
        '#product-genre',
        Number(VALUE_PRODUCT_GENRE)
      );
      HtmlElementUtility.clickHtmlElement<typeof component>(fixture, '#end-of-sale label');

      const privateMethodName = 'createSearchParamsDto';
      const resultProductListingSearchParamsDto: ProductListingSearchParamsDto = component[privateMethodName]();
      expect(resultProductListingSearchParamsDto).toEqual(expectedSearchParamsDto);
    });
  });
});

function createExpectedGenres() {
  return Array('1', '2', '3');
}

function createExpectedUser(): User {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'UTC';
  return user;
}

function createExpectedSearchParamsDto() {
  const productListingSearchParamsDto: ProductListingSearchParamsDto = {
    productName: VALUE_PRODUCT_NAME,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    productGenre: VALUE_PRODUCT_GENRE,
    endOfSale: VALUE_END_OF_SALE_TRUE,
    pageIndex: VALUE_PAGE_INDEX,
    pageSize: VALUE_PAGE_SIZE
  };
  return productListingSearchParamsDto;
}

function createExpectedSearchParamsDtoRequired() {
  const productListingSearchParamsDto: ProductListingSearchParamsDto = {
    productName: '',
    productCode: '',
    productGenre: '',
    endOfSale: VALUE_END_OF_SALE_TRUE,
    pageIndex: VALUE_PAGE_INDEX,
    pageSize: VALUE_PAGE_SIZE
  };
  return productListingSearchParamsDto;
}

function createExpectedSearchListResponseDto(): ProductSearchListResponseDto {
  const productSearchResponseDto: ProductSearchResponseDto[] = [
    {
      no: 1,
      productName: VALUE_PRODUCT_NAME,
      productCode: VALUE_PRODUCT_CODE_UPPER,
      productGenre: VALUE_PRODUCT_GENRE,
      productImageUrl: 'productImageUrl',
      productSizeStandard: 'productSizeStandard',
      productColor: 'productColor',
      productUnitPrice: 123,
      productStockQuantity: 456,
      endOfSale: false
    }
  ];
  const productSearchListResponseDto: ProductSearchListResponseDto = {
    productSearchResponseDtos: productSearchResponseDto,
    pageIndex: VALUE_PAGE_INDEX,
    resultsLength: 1
  };
  return productSearchListResponseDto;
}
