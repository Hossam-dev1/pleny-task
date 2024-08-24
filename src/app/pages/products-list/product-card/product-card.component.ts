import { Component, Input } from '@angular/core';
import { Product } from 'src/app/cores/interface/product.interface';
import { ProductsService } from '../services/products.service';
import { env } from 'src/enviroments/env';

@Component({
  selector: 'app-product-card',
  standalone: true,
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() product!: Product;
  constructor(private _productService: ProductsService) { }

  ngOnInit(): void {

  }

  onAddToCart(product: Product) {
    const userID = Number(localStorage.getItem(env.title + 'userID'))

    const data = {
      userId: userID,
      products: [
        {
          productId: product.id,
          quantity: 1
        }
      ]
    }

    this._productService.addToCart(data).subscribe({
      next: (data) => {
        alert(product.title + ' added to cart')
      }
    })
  }
}
