import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { NAV_ITEMS } from '../../shared/navigations/nav-items';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CommonModule } from '@angular/common';  //
import { RouterModule } from '@angular/router'; //to use routerLink Active
@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink, BsDropdownModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.css'
}) 

  export class DashboardSidebarComponent implements OnInit{

    username: string | null = null;
    role: 'Admin' | 'User' | null = 'Admin';
    navItems: Array<{ label: string; link: string; icon: string }> = [];
  
    constructor(private authService : AuthService, 
                private router: Router){}
  
    ngOnInit(): void {
  
      const decodedToken = this.authService.decodeToken();
      if (decodedToken) {
        this.username = decodedToken.id;
        this.role = decodedToken.role as 'Admin' | 'User';
        this.navItems = NAV_ITEMS[this.role || 'User'];
      }else { 
        console.error('Failed to decode token'); 
      }
    }
  
    onLogout(){
      this.authService.clearToken();
    }
}
