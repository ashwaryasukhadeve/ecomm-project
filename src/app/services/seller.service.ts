import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { login, signup } from '../data-type';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SellerService {
  issellerloggedIn = new BehaviorSubject<boolean>(false);
  isLoginError= new EventEmitter<boolean>(false)
  constructor(
    private http: HttpClient,
    private route: Router
  ) { }
  sellersignup(data: signup) {
    return this.http.post('http://localhost:3000/seller', data, { observe: 'response' }).subscribe((data) => {
      this.issellerloggedIn.next(true);
      localStorage.setItem('seller', JSON.stringify(data.body));
      this.route.navigate(['seller-home']);
    });
  }
  resetSeller() {
    if (localStorage.getItem('seller')) {
      this.issellerloggedIn.next(true);
      this.route.navigate(['seller-home']);
    }
  }
  sellerlogin(data: login) {
    return this.http.get(`http://localhost:3000/seller?email=${data.email}&password=${data.password}`, { observe: 'response' }).subscribe((result: any) => {
      if (result && result.body && result.body.length) {
        localStorage.setItem('seller', JSON.stringify(result.body));
        this.route.navigate(['seller-home']);
      } else {
        this.isLoginError.emit(true);
      }

    })


  }
}
