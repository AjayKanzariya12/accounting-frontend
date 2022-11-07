import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  postdata(data :any){
    
    return this.http.post<any>("http://localhost:3000/user",data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
  
  token = localStorage.getItem('token');
 
  getdata( ): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
   
   return this.http.get(environment.BaseUrl+'/api/admin/getAll',{headers:httpHeaders});
  }

  upadatproduct(data :any ,id:string){
    return this.http.put<any>(`${environment.BaseUrl}/api/admin/${id}`,data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  deleteproduct(id : string){
    return this.http.delete<any>(`${environment.BaseUrl}/api/admin/${id}`)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
}
