import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { cart, product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
productData:undefined|product;
productQuantity:number=1;
removeCart= false;
removeCartData:undefined|product;
constructor(
    private active:ActivatedRoute,
    private route:Router,
    private product:ProductService
  ) { }

  ngOnInit(): void {
    let productId = this.active.snapshot.paramMap.get('ProductId');
    productId && this.product.getproduct(productId).subscribe((res)=>{
      this.productData = res; 
      let cartData =localStorage.getItem('localCart');
      if(productId && cartData){
        let item = JSON.parse(cartData);
        item = item.filter((item:product)=>productId==item.id.toString())
        if(item.length){
          this.removeCart = true;
        }else{
          this.removeCart = false;
        }
      }
      let user = localStorage.getItem('user');
      if(user){
        let userId = user && JSON.parse(user).id;
        this.product.getCartList(userId);
        this.product.cartData.subscribe((res)=>{
          let item = res.filter((item:product)=>productId?.toString()===item.productId?.toString());
          if(item.length){
            this.removeCartData = item[0]
            this.removeCart = true;
          }
        })
      }

    })
  }
  handlequantity(val:string){
    if(this.productQuantity<20 && val==='plus'){
      this.productQuantity+=1;
    }else if(this.productQuantity>1 && val==='min'){
      this.productQuantity-=1;
    }
  } 
  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddtoCart(this.productData);
        this.removeCart = true;
      }
      else{
        // add to cart with user login
        console.log("User logged In");
        let user = localStorage.getItem('user');
        let userId = user && JSON.parse(user).id
        let cartData:cart ={
          ...this.productData,
          userId,
          productId:this.productData.id
        }
        delete cartData.id;
        console.log(cartData);
        this.product.addToCart(cartData).subscribe((res)=>{
          if(res){
            this.product.getCartList(userId);
            this.removeCart = true;
          }
          
        })
      }  
    }
  }
  removetoCart(productId:number){
    if(!localStorage.getItem('user')){ 
      this.product.removeitemFromCart(productId);
    }else{
  
      console.log(this.removeCartData);
      this.removeCartData && this.product.removeToCart(this.removeCartData?.id).subscribe((result)=>{
        if(result){
          let user = localStorage.getItem('user');
          let userId = user && JSON.parse(user).id
          this.product.getCartList(userId)
        }
      })
      this.removeCart = false;
    }
  }

}
