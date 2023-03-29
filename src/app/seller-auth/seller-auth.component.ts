import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';
import { SellerService } from '../services/seller.service';

@Component({
  selector: 'app-seller-auth',
  templateUrl: './seller-auth.component.html',
  styleUrls: ['./seller-auth.component.css']
})
export class SellerAuthComponent implements OnInit {
showlogin = false;
authError:string ="";
  constructor(
    private seller:SellerService,
    private route:Router
  ) { }

  ngOnInit(): void {
    this.seller.resetSeller()
  }
  sellerSignup(data:signup){
    this.seller.sellersignup(data);
  }
  Openlogin(){
    this.showlogin = true;
  }
  Opensignup(){
    this.showlogin = false;
  }
  sellerLogin(data:login){
    console.log(data); 
    this.seller.sellerlogin(data);
    this.seller.isLoginError.subscribe((isError)=>{
      if(isError){
        this.authError = "seller Email and Password is Incorrect";
      }
    });
  }

}
