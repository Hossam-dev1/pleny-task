import { Component } from '@angular/core';
import { ProductCardComponent } from './product-card/product-card.component';
import { ProductsService } from 'src/app/pages/products-list/services/products.service';
import { Category, Params, Product } from 'src/app/cores/interface/product.interface';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, NavigationEnd, Router, RouterModule } from '@angular/router';
import { filter } from 'rxjs';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    ProductCardComponent,
    CommonModule,
    RouterModule
  ],
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss']
})
export class ProductsListComponent {
  // State
  categoryList: Category[] = [];
  productList: Product[] = [];
  pagnitationParams: Params = {
    limit: 9,
  }
  selecteCategory: string = ''
  searchedProduct: string = ''
  constructor(private _productsService: ProductsService, private _router: Router, private _activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.onParamsChange();
    this.getCategoriesList();
  }

  getCategoriesList() {
    this._productsService.getCategories().subscribe({
      next: (data: Category[]) => {
        this.categoryList = data
      }
    })
  }
  getProducts(params: Params) {
    this._productsService.getProducts(params).subscribe({
      next: (resp) => {
        this.productList = resp.products
      }
    })
  }

  getProductByCategory(category: string) {
    this._productsService.getProductByCategory(category, this.pagnitationParams).subscribe({
      next: (resp) => {
        this.productList = resp.products
      }
    })
  }
  onFilterByCategory(category: string) {
    this._router.navigate(['/products-list'],
      { queryParams: { category }, queryParamsHandling: 'merge' })
  }

  onParamsChange() {
    const navigation = this._router.getCurrentNavigation();
    const state = navigation?.extras?.state;

    this._activatedRoute.queryParams.subscribe({
      next: (params) => {
        const { category, search } = params
        this.pagnitationParams.search = search;
        this.searchedProduct = search || ''

        this.selecteCategory = category || ''
        if (category) {
          this.getProductByCategory(category)
        } else {
          this.getProducts(this.pagnitationParams)
        }
      }
    })
  }

  onPageChange(action: string, page: number) {
    // pagination is not handled from backend
    return
    if (action === 'next') {
      this.pagnitationParams.skip = 9;
    } else {
      this.pagnitationParams.skip = 9
    }
    this.pagnitationParams.page = page

  }
}
