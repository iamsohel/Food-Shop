import { ShoppingCartService } from './../shopping-cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  carrt$;
  constructor(private shoppingCartService : ShoppingCartService) { }

  async ngOnInit() {
    this.carrt$ = await this.shoppingCartService.getCart();
  }

}
