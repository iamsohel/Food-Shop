import { Component, OnInit, Input } from '@angular/core';
import { Product } from '../models/product';
import { ShoppingCartService } from '../shopping-cart.service';
import { ProductFilterComponent } from '../products/product-filter/product-filter.component';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {

  @Input('product') product : Product;
  @Input('show-actions') showActions = true;
  constructor(private cartService : ShoppingCartService) { }

  AddToCart(product : Product){
    this.cartService.AddToCart(product);
  }

}
