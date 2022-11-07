import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/accountant', title: 'accountant',  icon: 'dashboard', class: '' },
    { path: '/user-profile', title: 'User',  icon:'person', class: '' },
    { path: '/admin', title: 'Admin',  icon:'content_paste', class: '' },
    { path: '/company', title: 'company',  icon:'library_books', class: '' },
    { path: '/type', title: 'Type',  icon:'bubble_chart', class: '' },
    { path: '/subscription', title: 'Subscription',  icon:'pie_chart', class: '' },
    { path: '/status', title: 'status',  icon:'notifications', class: '' },
    { path: '/category', title: 'category',  icon:'unarchive', class: '' },
    { path: '/file', title: 'file',  icon:'upload', class: '' },

];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
