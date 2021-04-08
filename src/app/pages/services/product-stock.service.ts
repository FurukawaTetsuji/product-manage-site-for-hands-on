import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';
import { SuccessMessagingService } from 'src/app/core/services/success-messaging.service';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import { ProductStockRequestDto } from '../models/dtos/requests/product-stock-request-dto';
import { ProductStockResponseDto } from '../models/dtos/responses/product-stock-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductStockService {
  constructor(
    private http: HttpClient,
    private successMessagingService: SuccessMessagingService,
    private errorMessageService: ErrorMessagingService
  ) {}

  /**
   * Gets product stock
   * @param productCode  product code
   * @returns product stock response
   */
  getProductStock(productCode: string): Observable<ProductStockResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http
      .get<ProductStockResponseDto>(webApiUrl, { params: { productCode } })
      .pipe(
        catchError((error) => {
          this.errorMessageService.setupPageErrorMessageFromResponse(error);
          return of(null as ProductStockResponseDto);
        })
      );
  }

  /**
   * Updates product stock
   * @param productStockRequestDto product Stock request
   * @returns product stock response
   */
  updateProductStock(productStockRequestDto: ProductStockRequestDto): Observable<ProductStockResponseDto> {
    const webApiUrl = ApiConst.PATH_API_ROOT + ApiConst.PATH_STOCK;
    this.clearMessageProperty();

    return this.http.put<ProductStockResponseDto>(webApiUrl, productStockRequestDto).pipe(
      map((res) => {
        this.successMessagingService.setMessageProperty('successMessage.http');
        return res;
      }),
      catchError((error) => {
        this.errorMessageService.setupPageErrorMessageFromResponse(error);
        return of(null as ProductStockResponseDto);
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
