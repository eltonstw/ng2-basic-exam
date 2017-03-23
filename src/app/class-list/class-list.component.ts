import { Component, OnInit } from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_LIST_DIRECTIVES} from '@angular2-material/list';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { Router } from '@angular/router';
import { ClassDetailComponent } from '../class-detail/class-detail.component';
import { ContactClass } from '../contact-class';
import { ApiService } from '../api.service';

@Component({
  moduleId: module.id,
  selector: 'app-class-list',
  templateUrl: 'class-list.component.html',
  styleUrls: ['class-list.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_LIST_DIRECTIVES,
    ClassDetailComponent
  ],

})
export class ClassListComponent implements OnInit {
  adding = false;
  classes: ContactClass[];

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses(){
    this.api.getClasses().then(res => this.classes = res);
  }

  addClass() {
    this.adding = true;
  }

  onAdded(value: ContactClass){
    this.getClasses();
    this.adding = false;
  }

  onSelect(id: string){
    this.router.navigate(['/class', id]);
  }

  onCancel(){
    this.router.navigate(['/']);
  }
}
