import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorMessagingService } from 'src/app/core/services/error-messaging.service';

import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ApiConst } from '../constants/api-const';
import {
    ProductSearchListResponseDto
} from '../models/dtos/responses/product-search-list-response-dto';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private http: HttpClient, private errorMessageService: ErrorMessagingService) {}

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
    this.errorMessageService.clearMessageProperty();
  }
}
