import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  popularproduct:undefined|product[];
  trendyproducts:undefined|product[];
  constructor(
    private product:ProductService
  ) { }

  ngOnInit(): void {
    this.product.popularProducts().subscribe((res)=>{
      console.log(res);
      this.popularproduct = res;      
    });
    this.product.trendyproducts().subscribe((data)=>{
      this.trendyproducts = data;      
    });
  }

}
