import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './home/default-layout/default-layout/default-layout.component';
import { IndexComponent } from './home/index/index/index.component';
import { AuthenticationComponent } from './home/authentication/authentication/authentication.component';
import { DashboardLayoutComponent } from './dashboard/dashboard-layout/dashboard-layout.component';
import { AdminHomeComponent } from './dashboard/admin-pages/admin-home/admin-home.component';
import { LinksComponent } from './dashboard/admin-pages/links/links.component';
import { CreareLinkComponent } from './dashboard/admin-pages/creare-link/creare-link.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
    {
        path: '',
        component:DefaultLayoutComponent ,
        children: [
          {
            path: '',
            component:IndexComponent,
            pathMatch: 'full',
          },
          {
            path: 'auth',
            component:AuthenticationComponent ,
          }
       
        ]
      },
      {
        path: '',
        component: DashboardLayoutComponent,
        children: [
          {
            path: 'dashboard',
            component: AdminHomeComponent,
            canActivate: [authGuard],
          }, 
          {
            path: 'urls',
            component: LinksComponent,
            canActivate: [authGuard],
          },
          {
            path: 'createUrl',
            component: CreareLinkComponent,
            canActivate: [authGuard],
          },         
        ],
      },
];
