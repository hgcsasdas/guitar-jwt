import { Category } from "../category/category";

export interface Product {
  id:number;
  name:string;
  price:number;
  image:string;
  description:string;
  quantity:number;
  category: Category;
}
