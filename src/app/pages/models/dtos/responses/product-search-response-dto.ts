export interface ProductSearchResponseDto {
  no: number;
  productName: string;
  productCode: string;
  productGenre: string;
  productImageUrl: string;
  productSizeStandard: string;
  productColor: string;
  productUnitPrice: number;
  productStockQuantity: number;
  endOfSale: boolean;
}
