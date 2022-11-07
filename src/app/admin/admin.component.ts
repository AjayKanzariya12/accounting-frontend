import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'app/services/admin.service';
import Swal from 'sweetalert2';
import { AdminModel } from './admin.model';
@Component({
  selector: 'app-table-list',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  formvalue!: FormGroup;
  Userdata!: any;
  UserModelobj: AdminModel = new AdminModel();
  add = true;
  update = false;
  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = 'fullName';
  isReverse = false;

  constructor(private formbuilder: FormBuilder, private api: AdminService) {}

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      photo: ['', Validators.required],
      password: ['', Validators.required],
      // data: [''],
      isSuperAdmin: [''],
    });
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

  postuserdetails() {
    this.UserModelobj.name = this.formvalue.value.name;
    this.UserModelobj.phone = this.formvalue.value.phone;
    this.UserModelobj.email = this.formvalue.value.email;
    // this.UserModelobj.photo = this.formvalue.value.photo;
    this.UserModelobj.password = this.formvalue.value.password;
    // this.UserModelobj.data = this.formvalue.value.data;
    this.UserModelobj.isSuperAdmin =this.formvalue.value.isSuperAdmin;

    this.api.postdata(this.UserModelobj).subscribe(
      (res) => {
        console.log(res);
        alert('User added successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();

        this.getAlluser();
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Something went wrong!',
        });
      }
    );
  }
  getAlluser() {
    const queryParams = {
      itemsPerPage: this.itemsPerPage,
      pageNo: this.currentPage,
      sortBy: this.sortBy,
      reverse: this.isReverse,
    };
    this.api.getdata().subscribe((res) => {
      this.Userdata = res;
      this.paymentHistory = res.results;
      this.totalItems = res.count;
    });
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

  // url!: '';
  onselectfile(e: any) {
    if (e.target.files) {
      var reder = new FileReader();
      reder.readAsDataURL(e.target.files[0]);
      reder.onload = (event: any) => {
        this.UserModelobj.photo = event.target.result;
      };
    }
  }

  onedit(row: any) {
    this.update = true;
    this.UserModelobj._id = row._id;
    this.formvalue.controls['name'].setValue(row.name);
    this.formvalue.controls['phone'].setValue(row.phone);
    this.formvalue.controls['email'].setValue(row.email);
    // this.formvalue.controls['photo'].setValue(row.photo);
    this.formvalue.controls['password'].setValue(row.password);
    // this.formvalue.controls['data'].setValue(row.data);
    this.formvalue.controls['isSuperAdmin'].setValue(row.isSuperAdmin);
  }

  updateUser() {
    this.UserModelobj.name = this.formvalue.value.name;
    this.UserModelobj.phone = this.formvalue.value.phone;
    this.UserModelobj.email = this.formvalue.value.email;
    // this.UserModelobj.photo = this.formvalue.value.photo;
    this.UserModelobj.password = this.formvalue.value.password;
    // this.UserModelobj.data = this.formvalue.value.data;
    this.UserModelobj.isSuperAdmin =this.formvalue.value.isSuperAdmin;

    this.api
      .upadatproduct(this.UserModelobj, this.UserModelobj._id)
      .subscribe((res) => {
        alert('User updated successfully');
        location.reload();
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formvalue.reset();
        this.getAlluser();

        // this.formvalue.reset();
      });
  }

  // selectChangeHandler(event: any) {
  //   this.UserModelobj.data = event.target.value;
  // }

  getSwitcherValue() {
    this.UserModelobj.isSuperAdmin = !this.UserModelobj.isSuperAdmin;
    console.log('onoffswitch:' + this.UserModelobj.isSuperAdmin);
  }
}
