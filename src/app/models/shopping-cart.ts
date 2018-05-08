import { ShoppingCartItem } from './shopping-cart-item';
export class ShoppingCart{
    items : ShoppingCartItem[] = [];
    constructor(public itemsMap : {[productId : string] : ShoppingCartItem}){
        for(let productId in itemsMap){
            this.items.push(itemsMap[productId]);
        }
    }

    getProductIds(){
        return Object.keys(this.itemsMap);
    }

   getTotalItemCount(){
       let count = 0;
       for(let productId in this.itemsMap){
           count += this.itemsMap[productId].quantity;
       }
   }
}