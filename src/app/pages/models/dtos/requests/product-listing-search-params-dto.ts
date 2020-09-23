import { BaseSearchParamsDto } from './base-search-params-dto';

export interface ProductListingSearchParamsDto extends BaseSearchParamsDto {
  productName: string;
  productCode: string;
  productGenre: string;
  endOfSale: boolean;
}
