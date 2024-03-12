import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryRequest } from '../../../services/category/requests/categoryRequest';
import { CategoryDTO } from '../../../services/category/DTO/categoryDTO';
import { catchError, tap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Category } from '../../../services/category/category';
import { CategoryRequestId } from '../../../services/category/requests/categoryRequestId';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-form-category',
  templateUrl: './form-category.component.html',
  styleUrls: ['./form-category.component.css'],
})
export class FormCategoryComponent implements OnInit {
  selectedCategoryId: number | null = null;

  categoryName: string = '';
  categoryError: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    private router: Router
  ) {}
  userLoginOn: boolean = false;

  userLoggedIn() {
    this.loginService.currentUserLoginOn.subscribe({
      next: (userLoginOn) => {
        this.userLoginOn = userLoginOn;
        if (!userLoginOn) {
          this.router.navigate(['/inicio']);
        }
      },
    });
  }

  ngOnInit() {
    this.userLoggedIn();
    this.route.paramMap.subscribe((params) => {
      const categoryId = params.get('id');
      if (categoryId !== null) {
        const categoryIdNumber = +categoryId;
        if (!isNaN(categoryIdNumber)) {
          this.selectedCategoryId = categoryIdNumber;

          this.categoryService.getCategoryById(categoryIdNumber).subscribe(
            (response: Category) => {
              this.categoryName = response.name;
            },
            (error) => {
              this.errorMessage = error.message;
            }
          );
        }
      }
    });
  }

  submitCategory() {
    if (this.categoryName.trim() !== '') {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        if (this.selectedCategoryId !== null) {
          const category: Category = {
            id: this.selectedCategoryId,
            name: this.categoryName,
          };

          const categoryRequestId: CategoryRequestId = {
            token: storedToken,
            category: category,
          };
          this.categoryService.updateCategory(categoryRequestId).subscribe({
            next: (response) => {
              if (response.done) {
                this.successMessage = response.message;
                this.errorMessage = '';
              } else {
                this.errorMessage = response.message;
                this.successMessage = '';
              }
            },
          });
        } else {
          const categoryDTO: CategoryDTO = {
            name: this.categoryName,
          };

          const requestObject: CategoryRequest = {
            token: storedToken,
            category: categoryDTO,
          };
          this.categoryService.createCategory(requestObject).subscribe({
            next: (response) => {
              if (response.done) {
                this.successMessage = response.message;
                this.errorMessage = '';
              } else {
                this.errorMessage = response.message;
                this.successMessage = '';
              }
            },
          });
        }
      } else {
        this.categoryError = 'El nombre de la categoría no puede estar vacío.';
      }
    }
  }
}
