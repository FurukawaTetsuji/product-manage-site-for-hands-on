import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import {
    MatDatepickerComponent
} from 'src/app/core/components/mat-datepicker/mat-datepicker.component';
import { MaterialModule } from 'src/app/material/material.module';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';
import { HtmlElementUtility } from 'src/app/testing/html-element-utility';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    PurchaseHistoryListingSearchParamsDto
} from '../../models/dtos/requests/purchase-history-listing-search-params-dto';
import {
    ProductPurchaseHistorySearchListResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-list-response-dto';
import {
    ProductPurchaseHistorySearchResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-response-dto';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ProductPurchaseService } from '../../services/product-purchase.service';
import { PurchaseHistoryListingPageComponent } from './purchase-history-listing-page.component';

/** Frequently used values */
const VALUE_PRODUCT_PURCHASE_NAME = 'productPurchaseName';
const VALUE_PRODUCT_PURCHASE_DATE_FROM = new Date('2020/1/1');
const VALUE_PRODUCT_PURCHASE_DATE_TO = new Date('2030/1/1');
const VALUE_PRODUCT_PURCHASE_DATE_FROM_ISO = '2019-12-31T15:00:00.000Z';
const VALUE_PRODUCT_PURCHASE_DATE_TO_ISO = '2030-01-01T15:00:00.000Z';
const VALUE_PRODUCT_NAME = 'productName';
const VALUE_PRODUCT_CODE_UPPER = 'PRODUCTCODE';
const VALUE_PRODUCT_CODE_LOWER = 'productCode';
const VALUE_PRODUCT_PURCHASE_UNIT_PRICE = 123;
const VALUE_PRODUCT_PURCHASE_QUANTITY = 2;
const VALUE_PRODUCT_PURCHASE_AMOUNT = 246;
const VALUE_PAGE_INDEX = 0;
const VALUE_PAGE_SIZE = 50;

describe('PurchaseHistoryListingPageComponent', () => {
  const IDS = {
    TITLE: '#title',
    PRODUCT_PURCHASE_NAME: '#product-purchase-name',
    PRODUCT_PURCHASE_DATE_FROM: '#product-purchase-date-from',
    PRODUCT_PURCHASE_DATE_TO: '#product-purchase-date-to',
    PRODUCT_CODE: '#product-code',
    PRODUCT_NAME: '#product-name'
  };
  const expectedUser = createExpectedUser();
  const expectedSearchParamsDto = createExpectedSearchParamsDto();
  const expectedSearchListResponseDto = createExpectedSearchListResponseDto();

  let component: PurchaseHistoryListingPageComponent;
  let fixture: ComponentFixture<PurchaseHistoryListingPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let productPurchaseServiceSpy: { getProductPurchaseHistoryList: jasmine.Spy };

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    productPurchaseServiceSpy = jasmine.createSpyObj('PurchaseService', ['getProductPurchaseHistoryList']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        BrowserAnimationsModule,
        MaterialModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        NgxUpperCaseDirectiveModule
      ],
      providers: [
        FormBuilder,
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductPurchaseService, useValue: productPurchaseServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy }
      ],
      declarations: [PurchaseHistoryListingPageComponent, MatDatepickerComponent]
    }).compileComponents();

    accountServiceSpy.getUser.and.returnValue(expectedUser);
    productPurchaseServiceSpy.getProductPurchaseHistoryList.and.returnValue(of(expectedSearchListResponseDto));

    fixture = TestBed.createComponent(PurchaseHistoryListingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#constractor', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  describe('#ngOnInit', () => {
    it('should set user lang to default of translate service on init', () => {
      component.ngOnInit();
      expect(component.translateService.getDefaultLang()).toEqual(expectedUser.userLanguage);
    });
  });

  describe('#ngAfterViewChecked', () => {
    it('should set title', () => {
      component.ngAfterViewChecked();
      expect(titleI18ServiceSpy.setTitle.calls.count()).toBeGreaterThan(1);
    });
  });

  describe('#clickClearButton', () => {
    it('should clear', () => {
      component.productPurchaseName.setValue(VALUE_PRODUCT_PURCHASE_NAME);
      component.productPurchaseDateFrom.setValue(VALUE_PRODUCT_PURCHASE_DATE_FROM);
      component.productPurchaseDateTo.setValue(VALUE_PRODUCT_PURCHASE_DATE_TO);
      component.productName.setValue(VALUE_PRODUCT_NAME);
      component.productCode.setValue(VALUE_PRODUCT_CODE_LOWER);
      spyOn(component.matDatePickerComponents.first, 'reset');
      spyOn(component.matDatePickerComponents.last, 'reset');

      component.purchaseHistorySearchResponsesDtos =
        expectedSearchListResponseDto.productPurchaseHistorySearchResponseDtos;
      component.resultsLength = expectedSearchListResponseDto.resultsLength;

      component.clickClearButton();

      expect(component.productPurchaseName.value).toEqual('');
      expect(component.productPurchaseDateFrom.value).toEqual(null);
      expect(component.productPurchaseDateTo.value).toEqual(null);
      expect(component.productName.value).toEqual('');
      expect(component.productCode.value).toEqual('');
      expect(component.matDatePickerComponents.first.reset).toHaveBeenCalled();
      expect(component.matDatePickerComponents.last.reset).toHaveBeenCalled();

      expect(component.purchaseHistorySearchResponsesDtos).toBeNull();
      expect(component.resultsLength).toEqual(0);
    });
  });

  describe('#clickSearchButton', () => {
    describe('If the page index does not change after searching', () => {
      it('should search normally', () => {
        component.clickSearchButton();
        expect(productPurchaseServiceSpy.getProductPurchaseHistoryList.calls.count()).toEqual(1);
        expect(component.purchaseHistorySearchResponsesDtos).toEqual(
          expectedSearchListResponseDto.productPurchaseHistorySearchResponseDtos
        );
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

  describe('#receivedEventFromChildFrom', () => {
    it('should set date', () => {
      component.receivedEventFromChildFrom(VALUE_PRODUCT_PURCHASE_DATE_FROM);
      expect(component.productPurchaseDateFrom.value).toEqual(VALUE_PRODUCT_PURCHASE_DATE_FROM);
    });
  });

  describe('#receivedEventFromChildTo', () => {
    it('should set date', () => {
      component.receivedEventFromChildTo(VALUE_PRODUCT_PURCHASE_DATE_TO);
      expect(component.productPurchaseDateTo.value).toEqual(VALUE_PRODUCT_PURCHASE_DATE_TO);
    });
  });
  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.TITLE)).nativeElement;
      expect(htmlElement.innerText).toContain('購入履歴一覧');
    });

    it('product purchase name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_PURCHASE_NAME)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('購入者');
    });
    it('product purchase date from', () => {
      const htmlInputElement: HTMLElement = fixture.debugElement.query(
        By.css(IDS.PRODUCT_PURCHASE_DATE_FROM)
      ).nativeElement;
      expect(htmlInputElement.innerText).toContain('購入日From');
    });
    it('product purchase date to', () => {
      const htmlInputElement: HTMLElement = fixture.debugElement.query(
        By.css(IDS.PRODUCT_PURCHASE_DATE_TO)
      ).nativeElement;
      expect(htmlInputElement.innerText).toContain('購入日To');
    });
    it('product code', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_CODE)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品コード');
    });
    it('product name', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.PRODUCT_NAME)).nativeElement;
      expect(htmlElement.dataset.placeholder).toContain('商品名');
    });
  });

  describe('DOM input test', () => {
    it('product purchase name', () => {
      const expectedValue = VALUE_PRODUCT_PURCHASE_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_PURCHASE_NAME,
        expectedValue
      );
      expect(component.productPurchaseName.value).toEqual(expectedValue);
    });
    it('product purchase date from', () => {
      const expectedValue = VALUE_PRODUCT_PURCHASE_DATE_FROM;
      component.receivedEventFromChildFrom(expectedValue);
      fixture.detectChanges();
      expect(component.productPurchaseDateFrom.value).toEqual(expectedValue);
    });
    it('product purchase date to', () => {
      const expectedValue = VALUE_PRODUCT_PURCHASE_DATE_TO;
      component.receivedEventFromChildTo(expectedValue);
      fixture.detectChanges();
      expect(component.productPurchaseDateTo.value).toEqual(expectedValue);
    });
    it('product name', () => {
      const expectedValue = VALUE_PRODUCT_NAME;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_NAME, expectedValue);
      expect(component.productName.value).toEqual(expectedValue);
    });
    it('product code', () => {
      const expectedValue = VALUE_PRODUCT_CODE_LOWER;
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_CODE, expectedValue);
      expect(component.productCode.value).toEqual(VALUE_PRODUCT_CODE_UPPER);
    });
  });

  describe('#createSearchParamsDto', () => {
    it('Should create product listing search params dto correctly', () => {
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        '#product-purchase-name',
        VALUE_PRODUCT_PURCHASE_NAME
      );
      component.receivedEventFromChildFrom(VALUE_PRODUCT_PURCHASE_DATE_FROM);
      component.receivedEventFromChildTo(VALUE_PRODUCT_PURCHASE_DATE_TO);

      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(fixture, IDS.PRODUCT_NAME, VALUE_PRODUCT_NAME);
      HtmlElementUtility.setValueToHTMLInputElement<typeof component>(
        fixture,
        IDS.PRODUCT_CODE,
        VALUE_PRODUCT_CODE_LOWER
      );

      const privateMethodName = 'createSearchParamsDto';
      const searchParamsDto: PurchaseHistoryListingSearchParamsDto = component[privateMethodName]();
      expect(searchParamsDto).toEqual(expectedSearchParamsDto);
    });
  });
});

function createExpectedUser(): User {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userCurrency = 'JPY';
  user.userLanguage = 'ja';
  user.userLocale = 'ja-JP';
  user.userName = 'userName';
  user.userTimezone = 'Asia/Tokyo';
  user.userTimezoneOffset = '+0900';
  return user;
}

function createExpectedSearchParamsDto() {
  const purchaseHistoryListingSearchParamsDto: PurchaseHistoryListingSearchParamsDto = {
    productPurchaseName: VALUE_PRODUCT_PURCHASE_NAME,
    productPurchaseDateFrom: VALUE_PRODUCT_PURCHASE_DATE_FROM_ISO,
    productPurchaseDateTo: VALUE_PRODUCT_PURCHASE_DATE_TO_ISO,
    productName: VALUE_PRODUCT_NAME,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    pageIndex: VALUE_PAGE_INDEX,
    pageSize: VALUE_PAGE_SIZE
  };
  return purchaseHistoryListingSearchParamsDto;
}

function createExpectedSearchListResponseDto(): ProductPurchaseHistorySearchListResponseDto {
  const productPurchaseHistorySearchResponseDto: ProductPurchaseHistorySearchResponseDto[] = [
    {
      no: 1,
      productName: VALUE_PRODUCT_NAME,
      productCode: VALUE_PRODUCT_CODE_UPPER,
      productPurchaseName: VALUE_PRODUCT_PURCHASE_NAME,
      productImageUrl: 'productImageUrl',
      productPurchaseDate: new Date(),
      productPurchaseUnitPrice: VALUE_PRODUCT_PURCHASE_UNIT_PRICE,
      productPurchaseQuantity: VALUE_PRODUCT_PURCHASE_QUANTITY,
      productPurchaseAmount: VALUE_PRODUCT_PURCHASE_AMOUNT
    }
  ];
  const productPurchaseHistorySearchListResponseDto: ProductPurchaseHistorySearchListResponseDto = {
    productPurchaseHistorySearchResponseDtos: productPurchaseHistorySearchResponseDto,
    pageIndex: VALUE_PAGE_INDEX,
    resultsLength: 1
  };
  return productPurchaseHistorySearchListResponseDto;
}
