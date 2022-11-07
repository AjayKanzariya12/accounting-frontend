import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http:HttpClient) { }

  token = localStorage.getItem('token');
 
  postdata(name:any ): Observable<any> {
   
   return this.http.post(environment.BaseUrl+'/api/admin/register',name);
  }
  
  getdata(){
    return this.http.get<any>(environment.BaseUrl+'/api/admin/all')
    .pipe(map((res :any)=>{
      return res;
    }))

  }

  upadatproduct(data :any ,id:string){
    return this.http.put<any>(`${environment.BaseUrl}/api/admin/all/${id}`,data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  deleteproduct(id : number){
    return this.http.delete<any>(`${environment.BaseUrl}/api/admin/all/${id}`)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
}
