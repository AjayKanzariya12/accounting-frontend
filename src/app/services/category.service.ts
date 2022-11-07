import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http:HttpClient) { }

 token = localStorage.getItem('token');
 
  postCategory(name:any ): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
   
   return this.http.post(environment.BaseUrl+'/api/category/create',name, {headers:httpHeaders});
  }
  

  getdata(){
    return this.http.get<any>(environment.BaseUrl+'/api/catagories')
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  upadatproduct(data :any ,id:string){
    return this.http.put<any>(`${environment.BaseUrl}/api/catagories/${id}`,data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  deleteproduct(id : string){
    return this.http.delete<any>(`${environment.BaseUrl}/api/catagories/${id}`)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
}
