import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_SIDENAV_DIRECTIVES} from '@angular2-material/sidenav';
import {MD_TOOLBAR_DIRECTIVES} from '@angular2-material/toolbar';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { ApiService } from './api.service';
import { ContactListComponent } from './contact-list/contact-list.component';
import { ClassSelectComponent } from './class-select/class-select.component';
import { ApiSelectComponent } from './api-select/api-select.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css'],
  providers: [MdUniqueSelectionDispatcher, ApiService],
  directives: [
    ROUTER_DIRECTIVES,
    MD_SIDENAV_DIRECTIVES,
    MD_TOOLBAR_DIRECTIVES,
    MD_BUTTON_DIRECTIVES,
    ContactListComponent,
    ClassSelectComponent,
    ApiSelectComponent
  ]
})
export class AppComponent {

  constructor(private router: Router) { }

  goToList() {
    this.router.navigate(['/']);
  }

  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

  goToContactList() {
    this.router.navigate(['/classList']);
  }
}
