import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubscriptionService } from 'app/services/subscription.service';
import Swal from 'sweetalert2';
import { SubscriptionModel } from './subscription.model';

@Component({
  selector: 'app-maps',
  templateUrl: './subscription.component.html',
  styleUrls: ['./subscription.component.css']
})
export class SubscriptionComponent implements OnInit {

    formvalue! :FormGroup;
  Userdata ! :any;
  UserModelobj :SubscriptionModel =new SubscriptionModel();
  add =true;
  update = false;

  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;

    constructor(private formbuilder :FormBuilder ,private api :SubscriptionService) { 
    }
  
    ngOnInit(): void {
      this.formvalue=this.formbuilder.group({
        username :['',Validators.required],
        duration :['',Validators.required],
        price :['',Validators.required],
        discription:['',Validators.required]
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
      
      this.UserModelobj.username =this.formvalue.value.username;
      this.UserModelobj.duration =this.formvalue.value.duration;
      this.UserModelobj.price =this.formvalue.value.price;
      this.UserModelobj.discription =this.formvalue.value.discription;




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
      this.api.deleteproduct(row.id)
      .subscribe(res=>{
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              'Deleted!',
              'product has been deleted.',
              'success'
            )
          }
        })
        this.getAlluser();
      })
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
      this.UserModelobj.id=row.id;
      this.formvalue.controls['username'].setValue(row.username);
      this.formvalue.controls['duration'].setValue(row.duration);
      this.formvalue.controls['price'].setValue(row.price);
      this.formvalue.controls['discription'].setValue(row.discription);


    }
    
    updateUser(){
      this.UserModelobj.username =this.formvalue.value.username;
      this.UserModelobj.duration =this.formvalue.value.duration;
      this.UserModelobj.price =this.formvalue.value.price;
      this.UserModelobj.discription =this.formvalue.value.discription;


      this.api.upadatproduct(this.UserModelobj,this.UserModelobj.id)
      .subscribe(res=>{
        alert("User updated successfully");
        location.reload();
        let ref= document.getElementById('cancel')
        ref?.click()
        this.formvalue.reset();
        this.getAlluser();
                
        // this.formvalue.reset();       
      })
  
    } 

    // selectChangeHandler (event: any) {
    //   this.UserModelobj.status = event.target.value;
    // }
}