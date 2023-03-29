import { Component, OnInit } from '@angular/core';
import { order } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-my-order',
  templateUrl: './my-order.component.html',
  styleUrls: ['./my-order.component.css']
})
export class MyOrderComponent implements OnInit {
orderData:order[]|undefined
  constructor(
    private product:ProductService,
  ) { }

  ngOnInit(): void {
   this.getOrder();
  }
cancelOrder(orderId:number|undefined){
  orderId && this.product.deleteOrder(orderId).subscribe((res)=>{
    this.getOrder();
  })
}
getOrder(){
  this.product.orderlist().subscribe((res)=>{
    this.orderData = res;
  })
}

}
