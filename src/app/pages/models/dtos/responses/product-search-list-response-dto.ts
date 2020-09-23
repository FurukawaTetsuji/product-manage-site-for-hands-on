import { BaseSearchListResponseDto } from './base-search-list-response-dto';
import { ProductSearchResponseDto } from './product-search-response-dto';

export interface ProductSearchListResponseDto extends BaseSearchListResponseDto {
  productSearchResponseDtos: ProductSearchResponseDto[];
}
