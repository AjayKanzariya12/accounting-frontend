import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http:HttpClient) { }

  token = localStorage.getItem('token');
 
  postdata(data:any ): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
   
   return this.http.post(environment.BaseUrl+'/api/company/create',data, {headers:httpHeaders});
  }
  
  getdata(){
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
      'Authorization': `Bearer ${this.token}`
    });
    return this.http.get<any>(environment.BaseUrl+'/api/company/all' , {headers:httpHeaders})
    .pipe(map((res :any)=>{
      return res;
    }))

  }

  upadatproduct(data :any ,id:string){
    return this.http.put<any>(`${environment.BaseUrl}/api/company/${id}`,data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  deleteproduct(id : number){
    return this.http.delete<any>(`${environment.BaseUrl}/api/company/${id}`)
    .pipe(map((res :any)=>{
      return res;
    }))
  }
}
