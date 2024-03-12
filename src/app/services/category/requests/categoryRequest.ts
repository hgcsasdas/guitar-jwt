import { CategoryDTO } from "../DTO/categoryDTO";


export interface CategoryRequest {
  token: string;
  category: CategoryDTO;
}
