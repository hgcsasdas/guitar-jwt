import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent {
  @Input() product: any;

  convertBase64ToImageUrl(base64String: string): string {
    return 'data:image/jpeg;base64,' + base64String;
  }
}
