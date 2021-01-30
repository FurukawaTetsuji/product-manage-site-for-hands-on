export interface ProductDto {
  productSeq: number;
  productCode: string;
  productName: string;
  productGenre: string;
  productImage: string;
  productSizeStandard: string;
  productColor: string;
  productUnitPrice: number;
  endOfSale: boolean;
  endOfSaleDate: Date;
  updateDate: Date;
}
