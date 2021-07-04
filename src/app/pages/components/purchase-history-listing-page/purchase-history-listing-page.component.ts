import { merge } from 'rxjs';
import { map, startWith, switchMap } from 'rxjs/operators';
import {
    MatDatepickerComponent
} from 'src/app/core/components/mat-datepicker/mat-datepicker.component';
import { LoadingService } from 'src/app/core/services/loading.service';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { HttpParams } from '@angular/common/http';
import {
    AfterViewChecked, Component, OnInit, QueryList, ViewChild, ViewChildren
} from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';

import { UrlConst } from '../../constants/url-const';
import {
    PurchaseHistoryListingSearchParamsDto
} from '../../models/dtos/requests/purchase-history-listing-search-params-dto';
import {
    ProductPurchaseHistorySearchResponseDto
} from '../../models/dtos/responses/product-purchase-history-search-response-dto';
import { AccountService } from '../../services/account.service';
import { ProductPurchaseService } from '../../services/product-purchase.service';

@Component({
  selector: 'app-purchase-history-listing-page',
  templateUrl: './purchase-history-listing-page.component.html',
  styleUrls: ['./purchase-history-listing-page.component.scss']
})
export class PurchaseHistoryListingPageComponent implements OnInit, AfterViewChecked {
  productPurchaseName = new FormControl('', []);
  productPurchaseDateFrom = new FormControl('', []);
  productPurchaseDateTo = new FormControl('', []);
  productName = new FormControl('', []);
  productCode = new FormControl('', []);

  searchForm = this.formBuilder.group({
    productPurchaseName: this.productPurchaseName,
    productName: this.productName,
    productPurchaseDateFrom: this.productPurchaseDateFrom,
    productPurchaseDateTo: this.productPurchaseDateTo,
    productCode: this.productCode
  });

  /** Locale, Currency, Timezone */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;
  timezoneOffset: string = this.accountService.getUser().userTimezoneOffset;

  /** Material table's header */
  displayColumns: string[] = [
    'no',
    'productName',
    'productCode',
    'productPurchaseName',
    'productImage',
    'productPurchaseDate',
    'productPurchaseUnitPrice',
    'productPurchaseQuantity',
    'productPurchaseAmount'
  ];

  /** Search result */
  purchaseHistorySearchResponsesDtos: ProductPurchaseHistorySearchResponseDto[];
  resultsLength = 0;

  /** Paginator and DatePicker */
  @ViewChild(MatPaginator) public paginator: MatPaginator;
  initialPageSize = 50;
  @ViewChildren(MatDatepickerComponent) public matDatePickerComponents: QueryList<MatDatepickerComponent>;

  constructor(
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productPurchaseService: ProductPurchaseService,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.setupLanguage();
  }

  /**
   * after view checked
   */
  ngAfterViewChecked(): void {
    this.titleI18Service.setTitle(UrlConst.PATH_PURCHASE_HISTORY_LISTING);
  }

  /**
   * Clicks clear button
   */
  clickClearButton(): void {
    this.clearSearchConditions();
    this.clearSearchResultList();
  }

  /**
   * Clicks search button
   */
  clickSearchButton(): void {
    merge(this.paginator.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.loadingService.startLoading();
          const searchParamsDto: PurchaseHistoryListingSearchParamsDto = this.createSearchParamsDto();
          return this.productPurchaseService.getProductPurchaseHistoryList(this.createHttpParams(searchParamsDto));
        }),
        map((data) => {
          this.loadingService.stopLoading();
          this.resultsLength = data.resultsLength;
          if (this.paginator.pageIndex !== data.pageIndex) {
            this.paginator.pageIndex = data.pageIndex;
          }
          return data.productPurchaseHistorySearchResponseDtos;
        })
      )
      .subscribe((data) => (this.purchaseHistorySearchResponsesDtos = data));
  }

  /**
   * Received event from child date from
   * @param eventData event data
   */
  receivedEventFromChildFrom(eventData: string): void {
    this.productPurchaseDateFrom.setValue(eventData);
  }

  /**
   * Received event from child date to
   * @param eventData event data
   */
  receivedEventFromChildTo(eventData: string): void {
    this.productPurchaseDateTo.setValue(eventData);
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private setupLanguage(): void {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private createSearchParamsDto(): PurchaseHistoryListingSearchParamsDto {
    let productPurchaseDateFromISOString = '';
    let productPurchaseDateToISOString = '';

    if (this.productPurchaseDateFrom.value) {
      productPurchaseDateFromISOString = new Date(
        this.productPurchaseDateFrom.value + this.timezoneOffset
      ).toISOString();
    }
    if (this.productPurchaseDateTo.value) {
      const date = new Date(this.productPurchaseDateTo.value);
      date.setDate(date.getDate() + 1);
      productPurchaseDateToISOString = new Date(date + this.timezoneOffset).toISOString();
    }

    const productListingSearchParamsDto: PurchaseHistoryListingSearchParamsDto = {
      productPurchaseName: this.productPurchaseName.value,
      productName: this.productName.value,
      productCode: this.productCode.value,
      productPurchaseDateFrom: productPurchaseDateFromISOString,
      productPurchaseDateTo: productPurchaseDateToISOString,
      pageSize: this.paginator.pageSize,
      pageIndex: this.paginator.pageIndex
    };

    return productListingSearchParamsDto;
  }

  private createHttpParams(purchaseHistoryListingSearchParamsDto: PurchaseHistoryListingSearchParamsDto): HttpParams {
    const paramsOptions = { fromObject: purchaseHistoryListingSearchParamsDto } as any;
    const params = new HttpParams(paramsOptions);
    return params;
  }

  private clearSearchConditions(): void {
    this.productPurchaseName.setValue('');
    this.productPurchaseDateFrom.setValue('');
    this.productPurchaseDateTo.setValue('');
    this.matDatePickerComponents.map((matDatePickerComponent) => matDatePickerComponent.reset());
    this.productName.setValue('');
    this.productCode.setValue('');
    this.paginator.pageIndex = 0;
  }

  private clearSearchResultList(): void {
    this.purchaseHistorySearchResponsesDtos = null;
    this.resultsLength = 0;
  }
}
