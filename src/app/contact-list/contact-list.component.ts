import { Component, OnInit } from '@angular/core';
import {NgIf, NgFor} from '@angular/common';
import {FORM_DIRECTIVES} from '@angular/forms';
import {MD_GRID_LIST_DIRECTIVES} from '@angular2-material/grid-list/grid-list';
import {MdButton} from '@angular2-material/button/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card/card';
import {MdIcon, MdIconRegistry} from '@angular2-material/icon/icon';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list/list';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { Contact } from '../contact';
import { ClassSelectComponent } from '../class-select/class-select.component';
import { ContactDetailComponent } from '../contact-detail/contact-detail.component';

@Component({
  moduleId: module.id,
  selector: 'app-contact-list',
  templateUrl: 'contact-list.component.html',
  styleUrls: ['contact-list.component.css'],
  directives: [
    MD_GRID_LIST_DIRECTIVES,
    MdButton,
    MD_CARD_DIRECTIVES,
    MdIcon,
    FORM_DIRECTIVES,
    NgFor,
    MD_LIST_DIRECTIVES,
    ClassSelectComponent,
    ContactDetailComponent
  ],
  providers: [MdIconRegistry]
})
export class ContactListComponent implements OnInit {

  adding = false;
  contacts: Contact[];
  constructor(private api: ApiService,
    private route: Router) { }

  selectedClassId: string;

  ngOnInit() {
  }

  getContacts(classId: string) {
    this.api.getContacts(classId)
      .then(all => this.contacts = all);
  }

  bind(id: string) {
    this.selectedClassId = id;
    if (!this.adding) {
      this.getContacts(id);
    }
  }

  addContact() {
    this.adding = true;
  }

  onAdded(value: Contact){
    this.getContacts(this.selectedClassId);
    this.adding = false;
  }

  onItemClicked(id: string){
    //console.log(id);
    this.route.navigate(["/contact", id]);
  }
}
