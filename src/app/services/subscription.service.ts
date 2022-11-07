import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SubscriptionService {

  constructor(private http:HttpClient) { }

  postdata(data :any){
    
    return this.http.post<any>("http://localhost:3000/subscription",data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
  
  getdata(){
    return this.http.get<any>("http://localhost:3000/subscription")
    .pipe(map((res :any)=>{
      return res;
    }))

  }

  upadatproduct(data :any ,id :number){
    return this.http.put<any>("http://localhost:3000/subscription/"+id,data)
    .pipe(map((res :any)=>{
      return res;
    }))

  }

  deleteproduct(id : number){
    return this.http.delete<any>("http://localhost:3000/subscription/"+id)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
}
