import { async } from '@angular/core/testing';
import { AngularFireDatabase, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable } from '@angular/core';
import { Product } from './models/product';
import 'rxjs/add/operator/take';
import { ShoppingCart } from './models/shopping-cart';

@Injectable()
export class ShoppingCartService {

  constructor(private db: AngularFireDatabase) { }

  create(){
    return  this.db.list('/shopping-cart').push({
      dateCreated : new Date().getTime()
    });
  }

  async getCart() : Promise<FirebaseObjectObservable<ShoppingCart>>{
    let cartId = await this.getOrCreateCartId();
    return this.db.object('/shopping-cart/'+cartId);
  }

  private getItem(cartId : string, productId : string){
    return this.db.object('/shopping-cart/' + cartId + '/items' + productId);
  }

  private async getOrCreateCartId() : Promise<string>{
    let cartId = localStorage.getItem('cartId');

    if(cartId) return cartId;

      let result = await this.create();
      localStorage.setItem('cartId', result.key);
      return result.key;
  } 

  async AddToCart(product : Product){
    this.UpdateItemQuantity(product, 1);
  }

  async RemoveFromCart(product : Product){
    this.UpdateItemQuantity(product, -1);
  }

  private async UpdateItemQuantity(product : Product, change : Number){
    let cartId = await this.getOrCreateCartId();
    let $item = this.getItem(cartId, product.$key);
    $item.take(1).subscribe(item => {
     $item.update({product: product, quantity : (item.quantity || 0) + change});
    });
  }

}
