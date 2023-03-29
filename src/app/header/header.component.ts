import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
MenuType:string='default';
sellerName:string = "";
userName:string ="";
searchResult:undefined|product[];
cartitems=0;
  constructor(
  private route:Router,
  private product:ProductService
  ) { }

  ngOnInit(): void {
  this.route.events.subscribe((val:any)=>{
    if(localStorage.getItem('seller') && val.url.includes('seller')){
      console.log("In seller Area");
      this.MenuType = 'seller';
      if(localStorage.getItem('seller')){
        let sellerStore = localStorage.getItem('seller');
        let sellerData = sellerStore && JSON.parse(sellerStore)[0];
        this.sellerName =sellerData.username;
      }
    }else 
    if(localStorage.getItem('user')){
      let userStore = localStorage.getItem('user');
      let userData = userStore && JSON.parse(userStore);
      this.userName = userData.username;
      this.MenuType = 'user';
      this.product.getCartList(userData.id);

    } else{
      console.log("Outside seller");    
      this.MenuType = 'default';
    }
  });
  let cartData = localStorage.getItem('localCart');
  if(cartData){
    this.cartitems = JSON.parse(cartData).length
  }
  this.product.cartData.subscribe((items)=>{
    this.cartitems = items.length;
  })
  }
  logout(){
    localStorage.removeItem('seller');
    this.route.navigate([''])
  }
  userlogout(){
    localStorage.removeItem('user');
    this.route.navigate(['']);
    this.product.cartData.emit([]);
  }
  searchProduct(query:KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement;
      this.product.searchproducts(element.value).subscribe((result)=>{
        if(result.length>5){
          result.length = 5;
        }
        this.searchResult = result;
      })
    }
  }
  hideSearch(){
    this.searchResult = undefined;
  }
  submitSearch(val:string){
    this.route.navigate([`search/${val}`])
  }
  redircttoDetails(id:number){
    this.route.navigate(['/details/'+id])

  }


}
