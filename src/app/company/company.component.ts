import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CompanyService } from 'app/services/company.service';
import { CompanyModel } from './company.model';
@Component({
  selector: 'app-typography',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  formvalue! :FormGroup;
  Userdata ! :any;
  UserModelobj :CompanyModel =new CompanyModel();
  add =true;
  update = false;

  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;

    constructor(private formbuilder :FormBuilder ,private api :CompanyService) { 
    }
  
    ngOnInit(): void {
      this.formvalue=this.formbuilder.group({
        company_name :['',Validators.required],
        catagory_id :['',Validators.required],
        user_id :['',Validators.required],
        company_logo :['',Validators.required],
        country_id:['',Validators.required],
        accountant_status:['',Validators.required],
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
      
      this.UserModelobj.company_name =this.formvalue.value.company_name;
      this.UserModelobj.catagory_id =this.formvalue.value.catagory_id;
      this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.company_logo =this.formvalue.value.company_logo;
      this.UserModelobj.country_id =this.formvalue.value.country_id;
      this.UserModelobj.accountant_status =this.formvalue.value.accountant_status;
      this.UserModelobj.accountant_id =this.formvalue.value.accountant_id || undefined;




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
  
    onselectfile(e :any){
      if(e.target.files){
        var reder =new FileReader();
        reder.readAsDataURL(e.target.files[0])
        reder.onload =(event :any)=>{
          this.UserModelobj.company_logo =event.target.result;
  
        }
      }
  
    }
  
   
    onedit(row :any){
      this.update =true;
      this.UserModelobj._id=row._id;

      this.formvalue.controls['company_name'].setValue(row.company_name);
      this.formvalue.controls['catagory_id'].setValue(row.catagory_id);
      this.formvalue.controls['user_id'].setValue(row.user_id);
      // this.formvalue.controls['company_logo'].setValue(row.company_logo);
      this.formvalue.controls['country_id'].setValue(row.country_id);
      this.formvalue.controls['accountant_status'].setValue(row.accountant_status);
      this.formvalue.controls['accountant_id'].setValue(row.accountant_id);


    }
    
    updateUser(){
      this.UserModelobj.company_name =this.formvalue.value.company_name;
      this.UserModelobj.catagory_id =this.formvalue.value.catagory_id;
      this.UserModelobj.user_id =this.formvalue.value.user_id;
      // this.UserModelobj.company_logo =this.formvalue.value.company_logo;
      this.UserModelobj.country_id =this.formvalue.value.country_id;
      this.UserModelobj.accountant_status =this.formvalue.value.accountant_status;
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

    selectChangeHandler (event: any) {
      this.UserModelobj.accountant_status = event.target.value;
    }

}
