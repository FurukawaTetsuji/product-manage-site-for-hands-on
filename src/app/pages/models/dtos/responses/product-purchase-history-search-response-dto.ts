export interface ProductPurchaseHistorySearchResponseDto {
  no: number;
  productName: string;
  productCode: string;
  productPurchaseName: string;
  productImageUrl: string;
  productPurchaseDate: Date;
  productPurchaseUnitPrice: number;
  productPurchaseQuantity: number;
  productPurchaseAmount: number;
}
