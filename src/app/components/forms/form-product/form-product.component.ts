import { Component, OnInit } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { CategoryService } from '../../../services/category/category.service';
import { Category } from '../../../services/category/category';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductDTO } from '../../../services/products/DTO/productDTO';
import { ProductRequest } from '../../../services/products/requests/productRequest';
import { ProductsService } from '../../../services/products/products.service';
import { CategoryDTO } from '../../../services/category/DTO/categoryDTO';
import { LoginService } from '../../../services/auth/login.service';

@Component({
  selector: 'app-form-product',
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.css'],
})
export class FormProductComponent implements OnInit {
  selectedProductId: number | null = null;

  product: ProductDTO = {
    name: '',
    price: 0,
    image: '',
    description: '',
    quantity: 0,
    category: { id: 0, name: '' } as Category,
  };

  categories: Category[] = [];

  productError: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private productService: ProductsService,
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
    this.loadCategories();
    this.route.paramMap.subscribe((params) => {
      const productId = params.get('id');
      if (productId !== null) {
        const productIdNumber = +productId;
        if (!isNaN(productIdNumber)) {
          this.selectedProductId = productIdNumber;

          this.productService.getProductById(productIdNumber).subscribe(
            (response: ProductDTO) => {
              this.product = response;
            },
            (error: any) => {
              this.errorMessage = error.message;
            }
          );
        }
      }
    });
  }

  loadCategories() {
    this.categoryService.getAllCategories().subscribe(
      (response: Category[]) => {
        this.categories = response;
        if (this.categories.length > 0) {
          this.product.category = this.categories[0];
        }
      },
      (error) => {
        console.error('Error loading categories:', error);
      }
    );
  }

  submitProduct() {
    if (this.product.name.trim() !== '') {
      const storedToken = sessionStorage.getItem('token');
      if (storedToken) {
        if (this.selectedProductId !== null) {
          const categoria = this.product.category;

          const productRequest: ProductRequest = {
            token: storedToken,
            productDTO: {
              ...this.product,
              category: categoria,
            },
          };

          console.log('Updating product:', productRequest);

          this.productService
            .updateProduct(this.selectedProductId, productRequest)
            .subscribe({
              next: (response: any) => {
                this.handleResponse(response);
              },
              error: (error) => {
                // Handle error if needed
              },
            });
        } else {
          const categoria = this.product.category;

          const productRequest: ProductRequest = {
            token: storedToken,
            productDTO: {
              ...this.product,
              category: categoria,
            },
          };

          console.log(categoria);

          console.log('Creating product:', productRequest);

          this.productService.createProduct(productRequest).subscribe({
            next: (response: any) => {
              this.handleResponse(response);
            },
            error: (error) => {
              // Handle error if needed
              console.log(error);
            },
          });
        }
      } else {
        this.productError = 'El nombre del producto no puede estar vacío.';
      }
    }
  }
  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.convertImageToBase64(file);
    }
  }

  convertImageToBase64(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.product.image = e.target.result.split(',')[1];
    };
    reader.readAsDataURL(file);
  }

  private handleResponse(response: any) {
    if (response.done) {
      this.successMessage = response.message;
      this.errorMessage = '';
    } else {
      this.errorMessage = response.message;
      this.successMessage = '';
    }
  }
}
