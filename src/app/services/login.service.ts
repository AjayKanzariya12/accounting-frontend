import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  getLogin(username:any , password:any): Observable<any> {
    let httpHeaders = new HttpHeaders({
      'Content-Type' : 'application/json',
    });
   
   return this.http.post(environment.BaseUrl+'/api/admin/login',{username,password}, {headers:httpHeaders});
  }
}
