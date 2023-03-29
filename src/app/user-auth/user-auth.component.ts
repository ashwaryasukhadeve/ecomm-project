import { Component, OnInit } from '@angular/core';
import { cart, login, product, signup } from '../data-type';
import { UserService } from '../services/user.service';
import {ProductService} from '../services/product.service'

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {
showlogin:Boolean= true;
userAuthError:string="";
  constructor(
    private product:ProductService,

    private user:UserService,

  ) { }

  ngOnInit(): void {
    this.user.userAuthReset();
  }
  UserSignup(data:signup){
    this.user.usersignup(data);
  }
  UserLogin(data:login){
    this.user.userlogin(data);  
    this.user.invalidUser.subscribe((res)=>{
      if(res){
        this.userAuthError = "Please Enter Valid Details"
      }
      else{
        this.localCartToRemoteCart();
      }     
    })  
  }
  openlogin(){
    this.showlogin = true;
  }
  opensignup(){
    this.showlogin = false;
  }
  // localstorage to db
  localCartToRemoteCart(){
    let data = localStorage.getItem('localCart');
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if(data){
      let cartDataList:product[] = JSON.parse(data);
      cartDataList.forEach((product:product,index)=>{
        let cartData:cart ={
          ...product,
          productId:product.id,
          userId
        };
        delete cartData.id;
        setTimeout(() => {
          this.product.addToCart(cartData).subscribe((result)=>{
            if(result){
              console.log("Item Stoard in DB");
            }
          })
          if(cartDataList.length===index+1){
            localStorage.removeItem('localCart')
          }
        }, 500);
      });
    }
    // get cart with api
    setTimeout(() => {
      this.product.getCartList(userId);
    }, 2000);
  }

}
