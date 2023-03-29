import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent implements OnInit {
productmessage:undefined |string;
  constructor(
    private product:ProductService
  ) { }

  ngOnInit(): void {
  }
  Submit(data:product){
    this.product.addproduct(data).subscribe((res)=>{
      if(res){
        this.productmessage = "product Added Successfully"
      }
      setTimeout(() => {
        this.productmessage = undefined
      }, 3000);
    });
  }


}
