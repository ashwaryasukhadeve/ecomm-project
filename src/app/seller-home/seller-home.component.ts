import { Component, OnInit } from '@angular/core';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';
import { faEdit, faTrash} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent implements OnInit {
productlist:undefined|product[];
productDelete:undefined|string;
deleticon = faTrash;
editicon = faEdit;

  constructor(
    private products:ProductService
  ) { }

  ngOnInit(): void {
    this.list();
  }
  list(){
    this.products.productlisting().subscribe((res)=>{
      if(res){
        this.productlist = res;
      }
    })
  }
  OnDelete(id:number){
    this.products.deleteproduct(id).subscribe((result)=>{
    if(result){
      this.productDelete = "Product is Delated"
      this.list();
    }
    })
    setTimeout(()=>{
      this.productDelete = undefined;
    },3000)
  }


}
