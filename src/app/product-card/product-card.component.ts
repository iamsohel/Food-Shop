import { ShoppingCartComponent } from './../shopping-cart/shopping-cart.component';
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
  @Input('shopping-cart') ShoppingCart;
  constructor(private cartService : ShoppingCartService) { }

  AddToCart(product : Product){
    this.cartService.AddToCart(product);
  }

  getQuantity(){
    if(!this.ShoppingCart) return 0;

    let item = this.ShoppingCart.items[this.product.$key];
    return item ? item.quantity : 0;
  }

}
