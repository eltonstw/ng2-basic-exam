import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import { ApiService } from '../api.service';
import { ContactClass } from '../contact-class';
import { Guid } from '../guid';

@Component({
  moduleId: module.id,
  selector: 'app-class-detail',
  templateUrl: 'class-detail.component.html',
  styleUrls: ['class-detail.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES
  ]
})
export class ClassDetailComponent implements OnInit {
  sub: any;
  error: any;
  navigated = false; // true if navigated here

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();

  class: ContactClass;

  constructor(
    private api: ApiService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      if (params['id'] !== undefined) {
        let id = params['id'];
        this.navigated = true;
        this.api.getClass(id).then(item => this.class = item);
      } else {
        this.navigated = false;
        this.class = new ContactClass();
      }
    });
  }

  save() {
    if (this.navigated) {
      this.api.putClass(this.class).then(item => {
        this.class = item;
        this.goBack(item);
      })
        .catch(err => this.showError(err));
    } else {
      this.class.ClassId = Guid.MakeNew().ToString();
      this.api.postClass(this.class).then(item => {
        this.class = item;
        this.goBack(item);
      })
        .catch(err => this.showError(err));
    }
  }

  cancel() {
    this.canceled.emit(null);
    if (this.navigated) { 
      window.history.back();
       //this.router.navigate(['/classList']);
    }
  }

  goBack(savedItem: ContactClass = null) {
    this.saved.emit(savedItem);
    if (this.navigated) { window.history.back(); }
  }

  remove(){
    this.api.deleteClass(this.class.ClassId).then(res => {
      if (this.navigated) { this.router.navigate(['/classList']); }
    });
  }

  private showError(error) {
    let errObj = error.json();
    this.error += errObj.Message;
    if (errObj.ModelState['contactClass.Name']) {
      this.error += errObj.ModelState['contactClass.Name'][0];
    }
  }
}
