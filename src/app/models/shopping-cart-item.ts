import { Product } from './product';
export interface ShoppingCartItem{
    product : Product;
    quantity : number;

    get totalPrice() {
        return this.product.price * this.quantity;
    }
}