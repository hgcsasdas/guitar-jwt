// app-products-table.component.ts
import { Component, OnInit } from '@angular/core';
import { Product } from '../../../services/products/product';
import { ProductsService } from '../../../services/products/products.service';
import { TokenIdRequestId } from '../../../services/requests/tokenIdRequestId';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products-table',
  templateUrl: './products-table.component.html',
  styleUrls: ['./products-table.component.css'],
})
export class ProductsTableComponent implements OnInit {
  products: Product[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductsService, private router: Router) {}

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts(): void {
    this.productService.getAllProducts().subscribe(
      (products: Product[]) => {
        this.products = products;
      },
      (error: any) => {
        console.error('Error obteniendo productos:', error);
      }
    );
  }

  deleteProduct(productId: number): void {
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      const requestObject: TokenIdRequestId = {
        id: productId,
        token: storedToken,
      };
      this.productService.deleteProduct(requestObject).subscribe(
        () => {
          this.products = this.products.filter(
            (product) => product.id !== productId
          );
          console.log('Producto eliminado con éxito.');
        },
        (error: any) => {
          console.error('Error eliminando producto:', error);
        }
      );
    }
  }
  editProduct(productId: number): void {
    this.router.navigate(['/administracion/formulario-producto', productId]);
  }
  getFilteredProducts(): Product[] {
    return this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }
}
