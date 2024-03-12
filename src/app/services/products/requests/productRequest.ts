import { ProductDTO } from "../DTO/productDTO";

export interface ProductRequest {
  token:string;
  productDTO: ProductDTO;
}
