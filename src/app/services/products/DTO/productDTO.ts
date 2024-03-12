import { CategoryDTO } from "../../category/DTO/categoryDTO";
import { Category } from "../../category/category";

export interface ProductDTO {
  name: string;
  price: number;
  image: string;
  description: string;
  quantity: number;
  category: Category;
}
