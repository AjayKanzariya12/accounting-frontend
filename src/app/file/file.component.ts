import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'app/services/file.service';
import Swal from 'sweetalert2';
import { FileModel } from './file.model';

@Component({
  selector: 'app-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {

  formvalue! :FormGroup;
  Userdata ! :any;
  UserModelobj :FileModel =new FileModel();
  add =true;
  update = false;

  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;

    constructor(private formbuilder :FormBuilder ,private api :FileService ) { 
    }
  
    ngOnInit(): void {
      this.formvalue=this.formbuilder.group({
        // username :['',Validators.required],
        type_id :['',Validators.required],
        user_id :['',Validators.required],
        file :['',Validators.required],
        status_id:['',Validators.required],
        // status:['',Validators.required],
        accountant_id:['',Validators.required]
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
      
      // this.UserModelobj.username =this.formvalue.value.username;
      this.UserModelobj.type_id =this.formvalue.value.type_id;
      this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.file =this.formvalue.value.file;
      this.UserModelobj.status_id =this.formvalue.value.status_id;
      // this.UserModelobj.status =this.formvalue.value.status;
      this.UserModelobj.accountant_id =this.formvalue.value.accountant_id;



console.log(this.UserModelobj)
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
        console.log(res)
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
   
    onselectfile(e :any){
      if(e.target.files){
        var reder =new FileReader();
        reder.readAsDataURL( e.target.files[0])
        reder.onload =(event :any)=>{
          // this.UserModelobj.file= this.domSanitizer.bypassSecurityTrustUrl(reder.result);
          // console.log( this.UserModelobj.file);
        this.UserModelobj.file =event.target.result;
     
  
        }
      }
  
    }
  
   
    onedit(row :any){
      this.update =true;
      this.UserModelobj._id=row._id;
      // this.formvalue.controls['username'].setValue(row.username);
      this.formvalue.controls['type_id'].setValue(row.type_id);
      this.formvalue.controls['user_id'].setValue(row.user_id);
      // this.formvalue.controls['file'].setValue(row.file);
      this.formvalue.controls['status_id'].setValue(row.status_id);
      // this.formvalue.controls['status'].setValue(row.status);
      this.formvalue.controls['accountant_id'].setValue(row.accountant_id);


    }
    
    updateUser(){
      // this.UserModelobj.username =this.formvalue.value.username;
      this.UserModelobj.type_id =this.formvalue.value.type_id;
      this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.file =this.formvalue.value.file;
      this.UserModelobj.status_id =this.formvalue.value.status_id;
      // this.UserModelobj.status =this.formvalue.value.status;
      this.UserModelobj.accountant_id =this.formvalue.value.accountant_id;


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

    // selectChangeHandler (event: any) {
    //   this.UserModelobj.status = event.target.value;
    // }
}
