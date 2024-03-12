// categories-table.component.ts
import { Component, OnInit } from '@angular/core';

import { TokenIdRequestId } from '../../../services/requests/tokenIdRequestId';
import { Category } from '../../../services/category/category';
import { CategoryService } from '../../../services/category/category.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categories-table',
  templateUrl: './categories-table.component.html',
  styleUrls: ['./categories-table.component.css']
})
export class CategoriesTableComponent implements OnInit {
  categories: Category[] = [];
  searchTerm: string = '';

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.getAllCategories();
  }

  getAllCategories(): void {
    this.categoryService.getAllCategories().subscribe(
      (categories: Category[]) => {
        this.categories = categories;
      },
      (error: any) => {
        console.error('Error obteniendo categorías:', error);
      }
    );
  }

  deleteCategory(categoryId: number): void {
    const storedUsername = sessionStorage.getItem('token');
    if (storedUsername) {
      const requestObject: TokenIdRequestId = {
        id: categoryId,
        token: storedUsername,
      };
      console.log('Eliminando categoría con ID:', categoryId);

      this.categoryService.deleteCategory(requestObject).subscribe(
        () => {
          this.categories = this.categories.filter(
            (category) => category.id !== categoryId
          );
          console.log('Categoría eliminada con éxito.');
        },
        (error: any) => {
          console.error('Error eliminando categoría:', error);
        }
      );
    }
  }

  editCategory(categoryId: number): void {
    this.router.navigate(['/administracion/formulario-categoria', categoryId]);
  }

  getFilteredProducts(): Category[] {
    return this.categories.filter(categories =>
      categories.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
