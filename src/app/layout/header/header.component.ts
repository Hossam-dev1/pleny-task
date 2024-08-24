import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { AuthService } from 'src/app/pages/auth/services/auth.service';
import { ProductsService } from 'src/app/pages/products-list/services/products.service';
import { env } from 'src/enviroments/env';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isAuthenticated!: boolean;
  searchTerm: string = ''
  cartCounter: number = 0

  constructor(
    private _authService: AuthService,
    private _productSerivce: ProductsService,
    private _router: Router,
    private _activateRouter: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this._authService.isAuthenticated$.subscribe((value) => {
      this.isAuthenticated = value;
      if (this.isAuthenticated) {
        const userID = Number(localStorage.getItem(env.title + 'userID'))
        this.getCartCount(userID);
      }
    })
  }

  onSearchProducts(event: any) {
    this._router.navigate(['/products-list'], {
      queryParams: { search: this.searchTerm }, queryParamsHandling: 'merge',
    });
  }

  getCartCount(UserID: number) {
    return this._productSerivce.getCartByUserID(UserID).subscribe({
      next: (data) => {
        this.cartCounter = data.total
      }
    })
  }
}
