import { ProductService } from './../../product.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/take'
import { Subscription } from 'rxjs/Subscription';
import { Product } from '../../models/product';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {
  products: Product[];
  filteredProducts: any[];
  subscription : Subscription;
  tableResource : DataTableResource<Product>;
  product = {};
  id;
  constructor(private productService : ProductService,
    private router : Router, 
    private route : ActivatedRoute,
    )  {
    this.subscription = this.productService.getAll().subscribe(products => this.filteredProducts = this.products = products);
    this.id = this.route.snapshot.paramMap.get('id');
   }

   delete(){
      if(confirm('Are you sure you want to delete this product?')) {
        this.productService.delete(this.id);
        this.router.navigate(['/admin/products']);
      }else return;
   
  }

  filter(query : string){
   this.filteredProducts = (query) ?
   this.products.filter(p => p.title.toLowerCase().includes(query.toLowerCase())) :
   this.products;

  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }

  ngOnInit() {
  }


}
