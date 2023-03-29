import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent implements OnInit {
productData:undefined|product
ProductMessage:undefined|string;
  constructor(
    private actroute:ActivatedRoute,
    private product:ProductService
  ) { }

  ngOnInit(): void {
    let productId = this.actroute.snapshot.paramMap.get('id');
    console.log(productId);
    productId && this.product.getproduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
    })
  }
  updateproduct(data:product){
    if(this.productData){
      data.id = this.productData.id
    }
    this.product.updateproduct(data).subscribe((res)=>{
      if(res){
        this.ProductMessage = "Product Has Updated"
      }
    }) 
    setTimeout(() => {
      this.ProductMessage = undefined
    },2000);
  }

}
