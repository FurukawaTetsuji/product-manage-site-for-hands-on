import { BaseSearchParamsDto } from './base-search-params-dto';

export interface PurchaseHistoryListingSearchParamsDto extends BaseSearchParamsDto {
  productPurchaseName: string;
  productPurchaseDateFrom: string;
  productPurchaseDateTo: string;
  productName: string;
  productCode: string;
}
