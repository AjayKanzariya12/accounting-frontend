import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  constructor(private http:HttpClient) { }

  postdata(data:any ): Observable<any> {

   
   return this.http.post(environment.BaseUrl+'/upload',data);
  }
  
  getdata(){  
    return this.http.get<any>(environment.BaseUrl+'/api/file/all')
    .pipe(map((res :any)=>{
      return res;
    }))

  }

  upadatproduct(data :any ,id:string){
    return this.http.put<any>(`${environment.BaseUrl}/api/file/${id}`,data)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

  deleteproduct(id : number){
    return this.http.delete<any>(`${environment.BaseUrl}/api/file/${id}`)
    .pipe(map((res :any)=>{
      return res;
    }))
  }

}
