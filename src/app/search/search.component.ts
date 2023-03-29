import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { product } from '../data-type';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
searchResult:undefined|product[];
  constructor(
    private actroute:ActivatedRoute,
    private Product:ProductService
  ) { }

  ngOnInit(): void {
    let query = this.actroute.snapshot.paramMap.get('query');
    query && this.Product.searchproducts(query).subscribe((result)=>{
      this.searchResult = result;
    })
    
  }

}
