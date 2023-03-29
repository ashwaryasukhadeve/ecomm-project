import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { AuthGuard } from './guard/auth.guard';
import { HomeComponent } from './home/home.component';
import { MyOrderComponent } from './my-order/my-order.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { SearchComponent } from './search/search.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
const routes: Routes = [
  {
    path:"",component:HomeComponent
  },
  {
    path:"seller-auth",component:SellerAuthComponent
  },
  {
    path:"seller-home",canActivate:[AuthGuard],component:SellerHomeComponent
  },
  {
    path:"seller-add-product",canActivate:[AuthGuard],component:SellerAddProductComponent
  },
  {
    path:"seller-update-product/:id",canActivate:[AuthGuard],component:SellerUpdateProductComponent
  },
  {
    path:"search/:query",canActivate:[AuthGuard],component:SearchComponent
  },
  {
    path:"details/:ProductId",canActivate:[AuthGuard],component:ProductDetailsComponent
  },
  {
    path:"user-auth",canActivate:[AuthGuard],component:UserAuthComponent
  },
  {
    path:"cart",component:CartComponent
  },
  {
    path:"checkout",component:CheckoutComponent
  },
  {
    path:"my-orders",component:MyOrderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
