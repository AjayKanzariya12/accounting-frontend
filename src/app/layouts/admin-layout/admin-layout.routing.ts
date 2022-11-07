import { Routes } from '@angular/router';

import { AccountantComponent } from '../../Accountant/Accountant.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { AdminComponent } from '../../admin/admin.component';
import { CompanyComponent } from '../../company/company.component';
import { TypeComponent } from '../../type/type.component';
import { SubscriptionComponent } from '../../subscription/subscription.component';
import { StatusComponent } from '../../status/status.component';
import { CategoryComponent } from '../../category/category.component';
import { FileComponent } from 'app/file/file.component';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    {path:'',pathMatch:'full',redirectTo:'accountant'},
    { path: 'accountant',      component: AccountantComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'admin',     component: AdminComponent },
    { path: 'company',     component: CompanyComponent },
    { path: 'type',          component: TypeComponent },
    { path: 'subscription',           component: SubscriptionComponent },
    { path: 'status',  component: StatusComponent },
    { path: 'category',        component: CategoryComponent },
    { path: 'file',        component: FileComponent },

    
];
