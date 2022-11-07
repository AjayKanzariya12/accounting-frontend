import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private api:LoginService ,private router:Router) { }

  ngOnInit(): void {
  }
  login(data:any,pass:any){
    this.api.getLogin(data,pass).subscribe(res =>{
      if(res.token){
        this.router.navigate(['/accountant']);
        localStorage.setItem('token',res.token)
      }
      console.log(res);
    });
  }
}
