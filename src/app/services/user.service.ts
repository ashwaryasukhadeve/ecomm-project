import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { login, signup } from '../data-type';

@Injectable({
  providedIn: 'root'
})
export class UserService {
invalidUser = new EventEmitter<boolean>(false);
  constructor(
    private http:HttpClient,
    private route:Router
  ) { }
  usersignup(user:signup){
    return this.http.post('http://localhost:3000/user',user,{observe:'response'}).subscribe((res)=>{
      console.log(res);
      if(res.body){
        localStorage.setItem('user',JSON.stringify(res.body));
        this.route.navigate(['/']);
      }
    });
  }
  userAuthReset(){
    if(localStorage.getItem('user')){
      this.route.navigate(['']);
    }
  }
  userlogin(data:login){
    return this.http.get<signup[]>(`http://localhost:3000/user?.email=${data.email}&password=${data.password}`,{observe:'response'}).subscribe((res)=>{
      if(res && res.body?.length){
        this.invalidUser.emit(false);
        localStorage.setItem('user',JSON.stringify(res.body[0]));
        this.route.navigate(['/']);
      }else{
        this.invalidUser.emit(true);
      }
    })
  }
}
