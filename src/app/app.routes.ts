import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './home/default-layout/default-layout/default-layout.component';
import { IndexComponent } from './home/index/index/index.component';
import { AuthenticationComponent } from './home/authentication/authentication/authentication.component';

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
];
