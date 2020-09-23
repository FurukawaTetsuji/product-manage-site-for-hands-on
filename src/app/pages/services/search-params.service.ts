import { SessionStorageService } from 'src/app/core/services/session-storage.service';

import { Injectable } from '@angular/core';

import { AppConst } from '../constants/app-const';
import {
    ProductListingSearchParamsDto
} from '../models/dtos/requests/product-listing-search-params-dto';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {
  constructor() {}

  /**
   * Sets product listing search params
   * @param productListingSearchParamsDto product listing search params
   */
  setProductListingSearchParamsDto(productListingSearchParamsDto: ProductListingSearchParamsDto): void {
    SessionStorageService.setItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, productListingSearchParamsDto);
  }

  /**
   * Gets product listing search params
   * @returns product listing search params
   */
  getProductListingSearchParamsDto(): ProductListingSearchParamsDto {
    return SessionStorageService.getItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST, {
      productName: '',
      productCode: '',
      productGenre: '',
      endOfSale: false,
      pageSize: 0,
      pageIndex: 0
    });
  }

  /**
   * Removes product listing search params
   */
  removeProductListingSearchParamsDto(): void {
    SessionStorageService.removeItem(AppConst.STORAGE_KEY_SEARCH_PARAMS_PRODUCT_LIST);
  }
}
