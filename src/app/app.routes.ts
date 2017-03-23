import { provideRouter, RouterConfig }  from '@angular/router';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ClassListComponent } from './class-list/class-list.component';
import { ClassDetailComponent } from './class-detail/class-detail.component';
import { ContactDetailComponent } from './contact-detail/contact-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: RouterConfig = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  {
    path: 'list',
    component: ContactListComponent
  },
  {
    path: 'classList',
    component: ClassListComponent
  },
  {
    path: 'class/:id',
    component: ClassDetailComponent
  },
  {
    path: 'contact/:id',
    component: ContactDetailComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
];

export const appRouterProviders = [
  provideRouter(routes)
];
