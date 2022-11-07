import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TypeService } from 'app/services/type.service';
import Swal from 'sweetalert2';
import { TypeModel } from './type.model';

@Component({
  selector: 'app-icons',
  templateUrl: './type.component.html',
  styleUrls: ['./type.component.css']
})
export class TypeComponent implements OnInit {

  formvalue! :FormGroup;
  Userdata ! :any;
  UserModelobj :TypeModel =new TypeModel();
  add =true;

  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;

    constructor(private formbuilder :FormBuilder ,private api :TypeService) { 
    }
  
    ngOnInit(): void {
      this.formvalue=this.formbuilder.group({
        name :['',Validators.required],
        color :['',Validators.required],
        icon :['',Validators.required],
        // user_id :['',Validators.required],
        // password:['',Validators.required],
        // status:['',Validators.required],
        // accountant_id:['',Validators.required]
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
      this.UserModelobj.color =this.formvalue.value.color;
      // this.UserModelobj.icon =this.formvalue.value.icon;
      // this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.password =this.formvalue.value.password;
      // this.UserModelobj.status =this.formvalue.value.status;
      // this.UserModelobj.accountant_id =this.formvalue.value.accountant_id;
    console.log(this.UserModelobj)



    this.api.postType(this.UserModelobj)
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
  
    ondeleteproduct(row: any) {
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
  
    // icon !:"";
    onselectfile(e :any){
      if(e.target.files){
        var reder =new FileReader();
        reder.readAsDataURL(e.target.files[0])
        reder.onload =(event :any)=>{
          this.UserModelobj.icon =event.target.result;
          console.log( this.UserModelobj.icon)
  
        }
      }
  
    }
  
   
    onedit(row :any){
      this.add = false
      console.log(this.UserModelobj)
      console.log(row)

      this.UserModelobj._id=row._id;

      this.formvalue.controls['name'].setValue(row.name);
      this.formvalue.controls['color'].setValue(row.color);
      // this.formvalue.controls['icon'].setValue(row.icon);
      


    }
    
    close(){
      this.add = true;
    }

    updateUser(){
      this.UserModelobj.name =this.formvalue.value.name;
      this.UserModelobj.color =this.formvalue.value.color;
      // this.UserModelobj.icon =this.formvalue.value.icon;
      // this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.password =this.formvalue.value.password;
      // this.UserModelobj.status =this.formvalue.value.status;
      // this.UserModelobj.accountant_id =this.formvalue.value.accountant_id;

      console.log(this.UserModelobj)

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

   
}
