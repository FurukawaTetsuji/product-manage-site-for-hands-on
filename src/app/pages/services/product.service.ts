import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { SuccessMessagingService } from 'src/app/core/services/success-messaging.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { ProductDto } from '../models/dtos/product-dto';
import {
    ProductSearchListResponseDto
} from '../models/dtos/responses/product-search-list-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) {}

  /**
   * Gets product list
   * @param httpParams search params
   * @returns product search response
   */
  getProductList(httpParams: HttpParams): Observable<ProductSearchListResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT_SEARCH;
    this.clearMessageProperty();

    return this.http
      .get<ProductSearchListResponseDto>(webApiUrl, { params: httpParams })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductSearchListResponseDto);
        })
      );
  }

  /**
   * Gets product
   * @param productCode product code
   * @returns product response
   */
  getProduct(productCode: string): Observable<ProductDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http
      .get<ProductDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductDto);
        })
      );
  }

  /**
   * Creates product
   * @param productDto product request
   * @returns producr response
   */
  createProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.post<ProductDto>(webApiUrl, productDto).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductDto);
      })
    );
  }

  /**
   * Updates product
   * @param productDto  product request
   * @returns producr response
   */
  updateProduct(productDto: ProductDto): Observable<ProductDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_PRODUCT;
    this.clearMessageProperty();

    return this.http.put<ProductDto>(webApiUrl, productDto).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductDto);
      })
    );
  }

  /**
   * Gets genres
   * @returns genres
   */
  getGenres(): Observable<string[]> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_GENRE;
    this.clearMessageProperty();

    return this.http.get<string[]>(webApiUrl).pipe(
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of([] as string[]);
      })
    );
  }
  // --------------------------------------------------------------------------------
  // private methods
  // --------------------------------------------------------------------------------
  private clearMessageProperty() {
    this.successMessagingService.clearMessageProperty();
    this.errorMessageService.clearMessageProperty();
  }
}
