import { AuthService } from './../../../shared/services/auth.service';
import { ProductService } from './../../../product/services/product.service';
import { ProductsListService } from './../../../products-list/services/products-list.service';

import { Component } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['../user.component.css']
})

export class ShoppingCartComponent {
  private userId: string;
  private products;
  private totalPrice = 1.020;
  constructor(private authService: AuthService, private productsListService: ProductsListService,
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.authService.authState.subscribe(id => {
      this.userId = id.uid;
      // this.products = this.userService.addToCart();
      this.products = this.productsListService.getProduct(this.userId);
    });
  }



  removeProduct(el) {
    console.log(el.currentTarget.value);
    const product = this.productService.getProduct(el.currentTarget.value);

  }
}
