import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { AccountantComponent } from '../../Accountant/Accountant.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminComponent } from '../../admin/admin.component';
import { CompanyComponent } from '../../company/company.component';
import { TypeComponent } from '../../type/type.component';
import { SubscriptionComponent } from '../../subscription/subscription.component';
import { StatusComponent } from '../../status/status.component';
import { CategoryComponent } from '../../category/category.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import {MatPaginatorModule} from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table'  
import { NgxPaginationModule } from 'ngx-pagination';
import { FileComponent } from 'app/file/file.component';
import { SafePipe } from 'app/pipe/sanitiz.pipe';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatTableModule,
    NgxPaginationModule
  ],
  declarations: [
    AccountantComponent,
    UserProfileComponent,
    AdminComponent,
    CompanyComponent,
    TypeComponent,
    SubscriptionComponent,
    StatusComponent,
    CategoryComponent,
    FileComponent,
    SafePipe

  ]
})

export class AdminLayoutModule {}
