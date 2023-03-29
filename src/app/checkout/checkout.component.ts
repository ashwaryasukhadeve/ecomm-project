import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { cart, order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
totalprice:number|undefined;
cartdata:undefined|cart[];
orderMsg:string|undefined;
  constructor(
    private product:ProductService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.product.currentCart().subscribe((result) => {
      let price = 0;
      this.cartdata =result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      });    
      this.totalprice = price + (price / 10) + 100 - (price / 10);  
      console.log(this.totalprice);
         
    })
  }
  orderNow(data:{email:string,address:string,contact:string}){
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(this.totalprice){
      let orderData:order={
        ...data,
        totalprice : this.totalprice,
        userId,
        id:undefined
      }
      this.cartdata?.forEach((item)=>{
        setTimeout(() => {
          item.id && this.product.deleteCartItems(item.id)
        }, 3000);
      })
      this.product.OrderNow(orderData).subscribe((result)=>{
        if(result){
          this.orderMsg = 'Your Order Has been Placed';
          setTimeout(() => {
            this.route.navigate(['/my-orders']);
            this.orderMsg = undefined;
          }, 4000);
        }
      })
    }    
  }

}
