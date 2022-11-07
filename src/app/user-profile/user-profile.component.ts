import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserModel } from './user.model';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { UserService } from 'app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  formvalue! :FormGroup;
  Userdata ! :any;
  UserModelobj :UserModel =new UserModel();
  add =true;
  update = false;
  
  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;
  
    
    constructor(private formbuilder :FormBuilder ,private api :UserService ,private http:HttpClient) { }
  
    ngOnInit(): void {
      this.formvalue=this.formbuilder.group({
        name :['',Validators.required],
        phone :['',Validators.required],
        email :['',Validators.required],
        url :['',Validators.required],
        password:['',Validators.required],
        type:['']
      })
      this.getAlluser();
     
    
    }
  
    changePage(pageNo: any) {
      this.currentPage = pageNo;
      this.getAlluser();
    }

    sort(key: string) {
      if (this.sortBy == key) {
        this.isReverse = !this.isReverse;
      } else {
        this.sortBy = key;
      }
      this.getAlluser();
    }
    
    postuserdetails(){
      
      this.UserModelobj.name =this.formvalue.value.name;
      this.UserModelobj.phone =this.formvalue.value.phone;
      this.UserModelobj.email =this.formvalue.value.email;
      this.UserModelobj.url =this.formvalue.value.url;
      this.UserModelobj.password =this.formvalue.value.password;
      this.UserModelobj.type =this.formvalue.value.type;


    this.api.postdata(this.UserModelobj)
    .subscribe(res =>{
      console.log(res);
      alert("User added successfully")
      let ref= document.getElementById('cancel')
      ref?.click()
      this.formvalue.reset();
      
      this.getAlluser();
      
  
    },
    err=>{
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
        
      })
    })
    
    }
    getAlluser(){
      const queryParams = {
        itemsPerPage: this.itemsPerPage,
        pageNo: this.currentPage,
        sortBy: this.sortBy,
        reverse: this.isReverse,
      };
      this.api.getdata()
      .subscribe(res=>{
        this.Userdata=res;
        this.paymentHistory = res.results;
        this.totalItems = res.count;
      })
    
    }
  
    ondeleteproduct(row : any){
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          this.api.deleteproduct(row._id).subscribe((res) => {
            this.getAlluser();
          });
          Swal.fire("Deleted!", "Category has been deleted.", "success");
        }
      });
    }
  
    url !:"";
    onselectfile(e :any){
      if(e.target.files){
        var reder =new FileReader();
        reder.readAsDataURL(e.target.files[0])
        reder.onload =(event :any)=>{
          this.url =event.target.result;
  
        }
      }
  
    }
  
   
    onedit(row :any){
      this.update =true;
      this.UserModelobj._id=row._id;

      this.formvalue.controls['name'].setValue(row.name);
      this.formvalue.controls['phone'].setValue(row.phone);
      this.formvalue.controls['email'].setValue(row.email);
      this.formvalue.controls['url'].setValue(row.url);
      this.formvalue.controls['password'].setValue(row.password);
      this.formvalue.controls['type'].setValue(row.type);

    }
    
    updateUser(){
      this.UserModelobj.name =this.formvalue.value.name;
      this.UserModelobj.phone =this.formvalue.value.phone;
      this.UserModelobj.email =this.formvalue.value.email;
      this.UserModelobj.url =this.formvalue.value.url;
      this.UserModelobj.password =this.formvalue.value.password;
      this.UserModelobj.type =this.formvalue.value.type;

      this.api.upadatproduct(this.UserModelobj,this.UserModelobj._id)
      .subscribe(res=>{
        alert("User updated successfully");
        let ref= document.getElementById('cancel')
        ref?.click()
        this.formvalue.reset();
        this.getAlluser();
                
        // this.formvalue.reset();       
      })
  
    } 

    selectChangeHandler (event: any) {
      this.UserModelobj.type = event.target.value;
    }

}
