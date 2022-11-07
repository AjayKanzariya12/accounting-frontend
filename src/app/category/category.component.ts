import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { CategoryService } from "app/services/category.service";
import Swal from "sweetalert2";
import { CategoryModel } from "./category.model";
@Component({
  selector: "app-upgrade",
  templateUrl: "./category.component.html",
  styleUrls: ["./category.component.css"],
})
export class CategoryComponent implements OnInit {
  formvalue!: FormGroup;
  Userdata!: any;
  UserModelobj: CategoryModel = new CategoryModel();
  add = true;
  // update = false;

  paymentHistory: any = [];
  currentPage = 1;
  itemsPerPage = 5;
  totalItems = 0;

  sortBy = "fullName";
  isReverse = false;

  constructor(private formbuilder: FormBuilder, private api: CategoryService) {}

  ngOnInit(): void {
    this.formvalue = this.formbuilder.group({
      name: ["", Validators.required],
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

  addCategory() {
    this.UserModelobj.name = this.formvalue.value.name;

    this.api.postCategory(this.UserModelobj).subscribe(
      (res) => {
        console.log(res);
        alert("Category added successfully");
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formvalue.reset();

        this.getAlluser();
      },
      (err) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
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
      console.log(res);
      this.Userdata = res;
      this.paymentHistory = res.results;
      this.totalItems = res.count;
    });
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

  onedit(row: any) {
    // this.update = true;
    this.add = false
    this.UserModelobj._id = row._id;
    this.formvalue.controls["name"].setValue(row.name);
  }
  
  close(){
    this.add = true;
  }

  updateUser() {
    this.UserModelobj.name = this.formvalue.value.name;

    this.api
      .upadatproduct(this.UserModelobj, this.UserModelobj._id)
      .subscribe((res) => {
        alert("Category updated successfully");
        // location.reload();
        let ref = document.getElementById("cancel");
        ref?.click();
        this.formvalue.reset();
        this.getAlluser();
       this.close();
        // this.formvalue.reset();
      });
  }
}
