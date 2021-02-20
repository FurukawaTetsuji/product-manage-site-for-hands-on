import { Observable, Subject } from 'rxjs';
import {
    YesNoDialogComponent
} from 'src/app/core/components/yes-no-dialog/yes-no-dialog.component';
import { RegexConst as RegexConstCore } from 'src/app/core/constants/regex-const';
import { YesNoDialogData } from 'src/app/core/models/yes-no-dialog-data';
import { FormattedCurrencyPipe } from 'src/app/core/pipes/formatted-currency.pipe';
import { LoadingService } from 'src/app/core/services/loading.service';
import { RoutingService } from 'src/app/core/services/routing.service';
import { RegexConst } from 'src/app/pages/constants/regex-const';
import { TitleI18Service } from 'src/app/shared/services/title-i18.service';

import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

import { AppConst } from '../../constants/app-const';
import { UrlConst } from '../../constants/url-const';
import { ProductDto } from '../../models/dtos/product-dto';
import { AccountService } from '../../services/account.service';
import { ProductService } from '../../services/product.service';
import {
    EndOfSaleEndOfSaleDateValidator
} from '../../validators/end-of-sale-end-of-sale-date-validator';

@Component({
  selector: 'app-product-registering-page',
  templateUrl: './product-registering-page.component.html',
  styleUrls: ['./product-registering-page.component.scss']
})
export class ProductRegisteringPageComponent implements OnInit, AfterViewChecked {
  productSeq = new FormControl('');
  productCode = new FormControl('', [Validators.required, Validators.pattern(RegexConstCore.SINGLE_BYTE_ALPHANUMERIC)]);
  productName = new FormControl('', [Validators.required]);
  productGenre = new FormControl('', [Validators.required]);
  productSizeStandard = new FormControl('', [Validators.required]);
  productColor = new FormControl('');
  productUnitPrice = new FormControl('', [
    Validators.required,
    Validators.min(1),
    Validators.max(99999999),
    Validators.pattern(RegexConstCore.SINGLE_BYTE_NUMERIC_COMMA_PERIOD_SPACE)
  ]);
  endOfSale = new FormControl(false);
  endOfSaleDate = new FormControl('');
  productImage = new FormControl(null);
  updateDate = new FormControl(null);

  registeringForm = this.formBuilder.group(
    {
      productSeq: this.productSeq,
      productCode: this.productCode,
      productName: this.productName,
      productGenre: this.productGenre,
      productSizeStandard: this.productSizeStandard,
      productColor: this.productColor,
      productUnitPrice: this.productUnitPrice,
      endOfSale: this.endOfSale,
      endOfSaleDate: this.endOfSaleDate,
      productImage: this.productImage,
      updateDate: this.updateDate
    },
    {
      validators: EndOfSaleEndOfSaleDateValidator
    }
  );

  /** Locale, Currency */
  locale: string = this.accountService.getUser().userLocale;
  currency: string = this.accountService.getUser().userCurrency;

  /** Select item of genre */
  genres: string[];

  /** FileInput and FileReader */
  @ViewChild('fileInputElement', { static: false }) public fileInputElement: ElementRef;

  /** Title and button text */
  messagePropertytitle = 'productRegisteringPage.title.new';
  messagePropertySaveButton = 'productRegisteringPage.saveButton.new';

  /** Called new or update? */
  isNew = this.routingService.router.url === UrlConst.SLASH + UrlConst.PATH_PRODUCT_REGISTERING_NEW;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private productService: ProductService,
    private accountService: AccountService,
    private routingService: RoutingService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private formattedCurrencyPipe: FormattedCurrencyPipe,
    private titleI18Service: TitleI18Service,
    public translateService: TranslateService
  ) {}

  /**
   * on init
   */
  ngOnInit(): void {
    this.loadData();
    this.setupLanguage();
    if (!this.isNew) {
      this.setupUpdateMode();
      this.getProduct();
    }
  }

  /**
   * after view checked
   */
  ngAfterViewChecked(): void {
    this.titleI18Service.setTitle(UrlConst.PATH_PRODUCT_REGISTERING);
  }

  /**
   * Clicks product image button
   * @param files image file
   */
  clickProductImageButton(files: File[]): void {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(RegexConst.MIME_TYPE_FILE_UPLOAD) == null) {
      return;
    }
    this.readFile(files[0]).subscribe((result) => {
      this.productImage.setValue(result);
    });
  }

  /**
   * Clicks clear button
   */
  clickClearButton(): void {
    this.fileInputElement.nativeElement.value = '';
    this.productImage.setValue(null);
  }

  /**
   * Clicks return button
   */
  clickReturnButton(): void {
    this.routingService.router.navigate([UrlConst.PATH_PRODUCT_LISTING]);
  }

  /**
   * Clicks save button
   */
  clickSaveButton(): void {
    const dialogData: YesNoDialogData = {
      title: this.translateService.instant('productRegisteringPage.saveYesNoDialog.title'),
      message: this.translateService.instant('productRegisteringPage.saveYesNoDialog.message'),
      captionNo: this.translateService.instant('productRegisteringPage.saveYesNoDialog.captionNo'),
      captionYes: this.translateService.instant('productRegisteringPage.saveYesNoDialog.captionYes')
    };

    const dialogRef = this.dialog.open(YesNoDialogComponent, {
      height: AppConst.YES_NO_DIALOG_HEIGHT,
      width: AppConst.YES_NO_DIALOG_WIDTH,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const productDto: ProductDto = this.createProductRegisterRequest(this.isNew);
        this.registerProduct(this.isNew, productDto);
      }
    });
  }

  /**
   * Received event from child
   * @param eventData entered end of sele date
   */
  receivedEventFromChild(eventData: string): void {
    this.endOfSaleDate.setValue(eventData);
  }

  /**
   * Resets end of sale date
   */
  resetEndOfSaleDate(): void {
    this.endOfSaleDate.setValue('');
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private loadData(): void {
    this.productService.getGenres().subscribe((data) => (this.genres = data));
  }

  private setupLanguage(): void {
    const lang = this.accountService.getUser().userLanguage;
    this.translateService.setDefaultLang(lang);
    this.translateService.use(lang);
  }

  private readFile(file: File): Observable<string> {
    const subject = new Subject<string>();
    const reader = new FileReader();
    reader.onload = () => {
      const content: string = reader.result as string;
      subject.next(content);
      subject.complete();
    };
    reader.readAsDataURL(file);
    return subject.asObservable();
  }

  private getProduct(): void {
    const productCode = this.route.snapshot.paramMap.get('productCode');
    this.loadingService.startLoading();
    this.productService.getProduct(productCode).subscribe((data) => {
      this.extractGetProductResponse(data);
      this.loadingService.stopLoading();
    });
  }

  private registerProduct(isNew: boolean, productDto: ProductDto): void {
    this.loadingService.startLoading();

    if (isNew) {
      // Creates product.
      this.productService.createProduct(productDto).subscribe((data) => {
        this.extractGetProductResponse(data);
        this.loadingService.stopLoading();
      });
    } else {
      // Updates product.
      this.productService.updateProduct(productDto).subscribe((data) => {
        this.extractGetProductResponse(data);
        this.loadingService.stopLoading();
      });
    }
  }

  private setupUpdateMode(): void {
    this.messagePropertytitle = 'productRegisteringPage.title.edit';
    this.messagePropertySaveButton = 'productRegisteringPage.saveButton.edit';
  }

  private createProductRegisterRequest(isNew: boolean): ProductDto {
    const productDto: ProductDto = {
      productSeq: null,
      productCode: this.productCode.value,
      productName: this.productName.value,
      productGenre: this.productGenre.value,
      productSizeStandard: this.productSizeStandard.value,
      productColor: this.productColor.value,
      productUnitPrice: Number(
        this.formattedCurrencyPipe
          .parse(this.productUnitPrice.value, this.locale)
          .replace(RegexConstCore.HalfWidthComma, RegexConstCore.HalfWidthPeriod)
      ),
      endOfSale: this.endOfSale.value,
      endOfSaleDate: this.endOfSaleDate.value === '' ? null : this.endOfSaleDate.value,
      productImage: this.productImage.value,
      updateDate: null
    };

    if (!isNew) {
      // for update
      productDto.productSeq = this.productSeq.value;
      productDto.updateDate = this.updateDate.value;
    }
    return productDto;
  }

  private extractGetProductResponse(productDto: ProductDto): void {
    if (!productDto) {
      return;
    }
    this.productSeq.setValue(productDto.productSeq);
    this.productCode.setValue(productDto.productCode);
    this.productName.setValue(productDto.productName);
    this.productGenre.setValue(productDto.productGenre);
    this.productSizeStandard.setValue(productDto.productSizeStandard);
    this.productColor.setValue(productDto.productColor);
    this.productUnitPrice.setValue(
      this.formattedCurrencyPipe.transform(productDto.productUnitPrice.toString(), this.locale, this.currency)
    );
    this.endOfSale.setValue(productDto.endOfSale);
    this.endOfSaleDate.setValue(productDto.endOfSaleDate ? productDto.endOfSaleDate : '');
    this.productImage.setValue(productDto.productImage);
    this.updateDate.setValue(productDto.updateDate);
  }
}
