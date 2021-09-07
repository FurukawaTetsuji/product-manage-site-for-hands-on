import { TranslateTestingModule } from 'ngx-translate-testing';
import { NgxUpperCaseDirectiveModule } from 'ngx-upper-case-directive';
import { of } from 'rxjs';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { MaterialModule } from 'src/app/material/material.module';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { UrlConst } from '../../constants/url-const';
import { ProductDto } from '../../models/dtos/product-dto';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import { ProductRegisteringPageComponent } from './product-registering-page.component';

/** Frequently used values */
const VALUE_PRODUCT_CODE_UPPER = 'PRODUCTCODE';
const VALUE_PRODUCT_NAME = 'productName';
const VALUE_PRODUCT_GENRE = '1';
const VALUE_PRODUCT_COLOR = 'productColor';
const VALUE_PRODUCT_SIZE_STANDARD = 'productSizeStandard';
const VALUE_PRODUCT_UNIT_PRICE = 1000;
const VALUE_PRODUCT_UNIT_PRICE_FORMATED = '1,000';
const VALUE_PRODUCT_IMAGE_DATA_URL =
  'data:image/png;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAsICAgICAsICAsQCwkLEBMOCwsOExYSEhMSEhYVERMSEhMRFRUZGhsaGRUhISQkISEwLy8vMDY2NjY2NjY2Njb/2wBDAQwLCwwNDA8NDQ8TDg4OExQODw8OFBoSEhQSEhoiGBUVFRUYIh4gGxsbIB4lJSIiJSUvLywvLzY2NjY2NjY2Njb/wAARCAEoAYsDASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9oADAMBAAIRAxEAPwD1yiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKZNKkEUk0mdkal2wMnCjJwB16VX1TUrbR9Pn1O83fZ7dd8mwZbGQAAMjua808UfEc6nbi30LfHaSDEshwsrk5/d4BOxMD5m79BRcdjQuvizbTW06aVZP9vwwtxcECMnsWCkN+HH1q/o/xI0lrFBrcxhvkO2YiJgh4BEhA3bAc4wx6g9sV5hb2C3heW6YtPJ0kXgr6bfQD0796cdRn0VktrxfMjP8Aq5U43r/8UKV2PQ98sr+y1KAXVhOlxA3SSNgwz6HHQ+xqxXjVlJLpN0b3TZvsd0f9Zs+5IB2lj6MOfr713vh7xtZ6tKun36iz1M/cQnMU2MAmFz3/ANg8j360XFY6iiiimIKKqXOq6ZZZ+13cMJAyVeRQ3/fOc1zGq/E7w3pwZYGe8lHAEYCJn3eUrx/ug0AdlVe91Cx06Hz7+4jt4ugaRguTjOFB5J9hzXkGrfFvVrkMlgqWqngeUN7D6yyqM/hGtcLf6vf6lMZ7yd5ZSMF3YsxHoWYk49ulK47Hs2q/Fjw/YMY7OOS9cfxL+7T82Bb/AMdrA/4XLdNL8umxCL+6XbP/AH2B/wCy15ZmpLaJ7idIU/iPJ9AOpoux6H0d4Y8T2fiiya5tkaGaIhbi2cgshOcHI6qcHB9q268U+HOqra+M1tEOIbyF7c+hdB5qn81IFe10ITCiiimIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKxfFPia28Laet/cwvOHkEaxx8ckE5JwcAYqh4w8bQeEzbRtbPcy3O7BB2ogXH3mweTngV5ZrviXU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gAooooAKKKKACiiigCje6Jo2pOJNQsLa6kAwHmiR2x6bmUnFZWoeAfCWpTPcXGnIs0nLvEWjyfXajBcnucc10dFAHDy/CTwlIWKC5jJ7LLwPoGU1Tf4N6AxBjvbpFHUZjOR6ZKV6JRRYd2eaN8GNML5TVLgJn7pRCcemeP5VC3wXh3HZrDBM8BrcE49yJQM49q9RoosF2eXn4L2+47dXbZ2BgBb8SJQP0qZPgzpo+/qc5+kaD+ZavSqKVkF2cDB8IfDsZBnuLmYDqNyJn/vlM1rW3w68I2ziT7AJSCCold2UY5xtzgj2INdRRTsF2U7PR9J05i9hY29s54LwxIjH6lVBq5RRQIKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigAooooAKKKKACiiigD//Z';

describe('ProductRegisteringPageComponent_edit', () => {
  const IDS = {
    TITLE: '#title',
    SAVE_BUTTON: '#save-button'
  };
  const expectedUser: User = createExpectedUser();
  const expectedGenres = createExpectedGenres();
  const expectedProductDto: ProductDto = createExpectedProductDto();
  const expectedProductDtoEndOfSaleDateNull: ProductDto = createExpectedProductDtoEndOfSaleDateNull();

  let component: ProductRegisteringPageComponent;
  let fixture: ComponentFixture<ProductRegisteringPageComponent>;
  let accountServiceSpy: { getUser: jasmine.Spy };
  let productServiceSpy: {
    getGenres: jasmine.Spy;
    getProduct: jasmine.Spy;
    createProduct: jasmine.Spy;
    updateProduct: jasmine.Spy;
  };
  let titleI18ServiceSpy: { setTitle: jasmine.Spy };
  let matDialogSpy: { open: jasmine.Spy };

  beforeEach(async () => {
    accountServiceSpy = jasmine.createSpyObj('AccountService', ['getUser']);
    productServiceSpy = jasmine.createSpyObj('ProductService', [
      'getGenres',
      'getProduct',
      'createProduct',
      'updateProduct'
    ]);
    titleI18ServiceSpy = jasmine.createSpyObj('TitleI18Service', ['setTitle']);
    matDialogSpy = jasmine.createSpyObj('MatDialog', ['open']);

    await TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        NgxUpperCaseDirectiveModule,
        HttpClientTestingModule,
        TranslateTestingModule.withTranslations({ ja: require('src/assets/i18n/ja.json') }),
        MaterialModule,
        BrowserAnimationsModule,
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        FormattedCurrencyPipe,
        { provide: MatDialog, useValue: matDialogSpy },
        { provide: AccountService, useValue: accountServiceSpy },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: TitleI18Service, useValue: titleI18ServiceSpy },
        {
          provide: Router,
          useValue: {
            url: UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING + '/:' + VALUE_PRODUCT_CODE_UPPER
          }
        },
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ productCode: VALUE_PRODUCT_CODE_UPPER }) } }
        }
      ],
      declarations: [ProductRegisteringPageComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    accountServiceSpy.getUser.and.returnValue(expectedUser);
    productServiceSpy.getGenres.and.returnValue(of(expectedGenres));
    productServiceSpy.getProduct.and.returnValue(of(expectedProductDto));
    fixture = TestBed.createComponent(ProductRegisteringPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('#ngOnInit', () => {
    it('should init screen', () => {
      expect(productServiceSpy.getGenres.calls.count()).toEqual(1);
      expect(component.genres).toEqual(expectedGenres);
      expect(productServiceSpy.getProduct.calls.count()).toEqual(1);
      expect(component.productSeq.value).toEqual(expectedProductDto.productSeq);
      expect(component.productCode.value).toEqual(expectedProductDto.productCode);
      expect(component.productName.value).toEqual(expectedProductDto.productName);
      expect(component.productGenre.value).toEqual(expectedProductDto.productGenre);
      expect(component.productSizeStandard.value).toEqual(expectedProductDto.productSizeStandard);
      expect(component.productColor.value).toEqual(expectedProductDto.productColor);
      expect(component.productUnitPrice.value).toEqual(VALUE_PRODUCT_UNIT_PRICE_FORMATED);
      expect(component.endOfSale.value).toEqual(expectedProductDto.endOfSale);
      expect(component.endOfSaleDate.value).toEqual(expectedProductDto.endOfSaleDate);
      expect(component.productImage.value).toEqual(expectedProductDto.productImage);
      expect(component.updateDate.value).toEqual(expectedProductDto.updateDate);
    });
  });

  describe('#clickSaveButton', () => {
    const privateMethodExtractResponse = 'extractGetProductResponse';

    beforeEach(() => {
      spyOn<any>(component, privateMethodExtractResponse).and.callThrough();
    });

    it('should update data', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.updateProduct.and.returnValue(of(expectedProductDto));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(0);
      expect(productServiceSpy.updateProduct.calls.count()).toEqual(1);
      expect(component[privateMethodExtractResponse]).toHaveBeenCalledOnceWith(expectedProductDto);
      expect(component.productSeq.value).toEqual(expectedProductDto.productSeq);
      expect(component.productCode.value).toEqual(expectedProductDto.productCode);
      expect(component.productName.value).toEqual(expectedProductDto.productName);
      expect(component.productGenre.value).toEqual(expectedProductDto.productGenre);
      expect(component.productSizeStandard.value).toEqual(expectedProductDto.productSizeStandard);
      expect(component.productColor.value).toEqual(expectedProductDto.productColor);
      expect(component.productUnitPrice.value).toEqual(VALUE_PRODUCT_UNIT_PRICE_FORMATED);
      expect(component.endOfSale.value).toEqual(expectedProductDto.endOfSale);
      expect(component.endOfSaleDate.value).toEqual(expectedProductDto.endOfSaleDate);
      expect(component.productImage.value).toEqual(expectedProductDto.productImage);
      expect(component.updateDate.value).toEqual(expectedProductDto.updateDate);
    });

    it('should update data when end of sale date is null', () => {
      matDialogSpy.open.and.returnValue({ afterClosed: () => of(true) });
      productServiceSpy.updateProduct.and.returnValue(of(expectedProductDtoEndOfSaleDateNull));
      component.clickSaveButton();
      expect(productServiceSpy.createProduct.calls.count()).toEqual(0);
      expect(productServiceSpy.updateProduct.calls.count()).toEqual(1);
      expect(component[privateMethodExtractResponse]).toHaveBeenCalledOnceWith(expectedProductDtoEndOfSaleDateNull);
      expect(component.endOfSaleDate.value).toEqual('');
    });
  });

  // --------------------------------------------------------------------------------
  // DOM test cases
  // --------------------------------------------------------------------------------
  describe('DOM placeholder', () => {
    it('title', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.TITLE)).nativeElement;
      expect(htmlElement.innerText).toEqual('商品更新');
    });
    it('saveBtn', () => {
      const htmlElement: HTMLElement = fixture.debugElement.query(By.css(IDS.SAVE_BUTTON)).nativeElement;
      expect(htmlElement.innerText).toContain('更新');
    });
  });
});

function createExpectedUser(): User {
  const user: User = new User();
  user.userAccount = 'userAccount';
  user.userName = 'userName';
  user.userLocale = 'ja-JP';
  user.userLanguage = 'ja';
  user.userTimezone = 'UTC';
  user.userTimezoneOffset = '+0900';
  user.userCurrency = 'JPY';
  return user;
}

function createExpectedGenres() {
  return Array('1', '2', '3');
}

function createExpectedProductDto() {
  const expectedProductDto: ProductDto = {
    productSeq: 1,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    productName: VALUE_PRODUCT_NAME,
    productGenre: VALUE_PRODUCT_GENRE,
    productImage: VALUE_PRODUCT_IMAGE_DATA_URL,
    productSizeStandard: VALUE_PRODUCT_SIZE_STANDARD,
    productColor: VALUE_PRODUCT_COLOR,
    productUnitPrice: VALUE_PRODUCT_UNIT_PRICE,
    endOfSale: true,
    endOfSaleDate: new Date(),
    updateDate: new Date()
  };
  return expectedProductDto;
}

function createExpectedProductDtoEndOfSaleDateNull() {
  const expectedProductDto: ProductDto = {
    productSeq: 1,
    productCode: VALUE_PRODUCT_CODE_UPPER,
    productName: VALUE_PRODUCT_NAME,
    productGenre: VALUE_PRODUCT_GENRE,
    productImage: VALUE_PRODUCT_IMAGE_DATA_URL,
    productSizeStandard: VALUE_PRODUCT_SIZE_STANDARD,
    productColor: VALUE_PRODUCT_COLOR,
    productUnitPrice: VALUE_PRODUCT_UNIT_PRICE,
    endOfSale: false,
    endOfSaleDate: null,
    updateDate: new Date()
  };
  return expectedProductDto;
}
