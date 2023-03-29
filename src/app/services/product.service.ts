import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { cart, order, product } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
cartData = new EventEmitter<product[] | []>();
  constructor(
    private http: HttpClient
  ) { }
  addproduct(data: product) {
    return this.http.post('http://localhost:3000/products', data);
  }
  productlisting() {
    return this.http.get<product[]>('http://localhost:3000/products');
  }
  deleteproduct(id: number) {
    return this.http.delete(`http://localhost:3000/products/${id}`);
  }
  getproduct(id: string) {
    return this.http.get<product>(`http://localhost:3000/products/${id}`);
  }
  updateproduct(product: product) {
    return this.http.put<product>(`http://localhost:3000/products/${product.id}`, product);
  }
  popularProducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=3');
  }
  trendyproducts(){
    return this.http.get<product[]>('http://localhost:3000/products?_limit=8');
  }
  searchproducts(query:string){
    return this.http.get<product[]>(`http://localhost:3000/products?q=${query}`);
  }
  localAddtoCart(data:product){
    let cartData = [];
    let localCart = localStorage.getItem('localCart');
    if(!localCart){
      localStorage.setItem('localCart',JSON.stringify([data]));
      this.cartData.emit([data]);

    }else{
      cartData = JSON.parse(localCart);
      cartData.push(data);
      localStorage.setItem('localCart',JSON.stringify(cartData));
    }
    this.cartData.emit(cartData);
  }
  removeitemFromCart(productId:number){
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      let items:product[]=JSON.parse(cartData);
      items = items.filter((item:product)=>productId!==item.id);
      localStorage.setItem('localCart',JSON.stringify(items));
      this.cartData.emit(items);
    }
  }
  addToCart(cart:cart){
    return this.http.post('http://localhost:3000/cart', cart);
  }
  getCartList(userId:number){
    return this.http.get<product[]>('http://localhost:3000/cart?userId' + userId, {observe: 'response',}).subscribe((result) => {
      console.log(result.body);
      
      if (result && result.body) {
        this.cartData.emit(result.body);
      }
    });
  }
  // remove cart from api
  removeToCart(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+ cartId);
  }
  // cart page
  currentCart(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<cart[]>('http://localhost:3000/cart?userId='+userData.id)
  }
  // order api
  OrderNow(data:order){
    return this.http.post('http://localhost:3000/orders',data);
  }
  // myorder
  orderlist(){
    let userStore = localStorage.getItem('user');
    let userData = userStore && JSON.parse(userStore);
    return this.http.get<order[]>('http://localhost:3000/orders?userId' + userData.id);
  }
  deleteCartItems(cartId:number){
    return this.http.delete('http://localhost:3000/cart/'+ cartId,{observe:'response'}).subscribe((result)=>{
      if(result){
        this.cartData.emit([]);
      }
    });
  }
  // cancel order
  deleteOrder(orderId:number){
    return this.http.delete('http://localhost:3000/orders/'+ orderId);
  }
}
