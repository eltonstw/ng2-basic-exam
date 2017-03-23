import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import {MD_INPUT_DIRECTIVES} from '@angular2-material/input';
import {MD_RADIO_DIRECTIVES} from '@angular2-material/radio';
import { ApiService } from '../api.service';
import { Contact } from '../contact';
import { ContactClass } from '../contact-class';
import { Guid } from '../guid';

@Component({
  moduleId: module.id,
  selector: 'app-contact-detail',
  templateUrl: 'contact-detail.component.html',
  styleUrls: ['contact-detail.component.css'],
  directives: [
    MD_BUTTON_DIRECTIVES,
    MD_CARD_DIRECTIVES,
    MD_INPUT_DIRECTIVES,
    MD_RADIO_DIRECTIVES,
  ]
})
export class ContactDetailComponent implements OnInit {


  sub: any;
  error: any;
  navigated = false; // true if navigated here

  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();

  @Input()
  selectedClassId: string;

  contact: Contact;
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
        this.api.getContact(id).then(item => {
          this.contact = item;
          console.log(this.contact)
          this.getClass(this.contact.ClassId);
        });
      } else {
        this.navigated = false;
        this.contact = new Contact();
        this.contact.Sex = 0;
      }

    });
  }

  getClass(classId: string) {
    this.api.getClass(classId).then(item => { this.class = item; });
  }

  onRadioClicked(target) {
    this.contact.Sex = +target.value;
  }

  save() {
    if (this.navigated) {
      this.api.putContact(this.contact).then(item => {
        this.contact = item;
        this.goBack(item);
      })
        .catch(err => this.showError(err));
    }
    else {
      this.contact.ClassId = this.selectedClassId;
      this.contact.ContactId = Guid.MakeNew().ToString();
      this.api.postContact(this.contact).then(item => {
        this.saved.emit(item);
      })
        .catch(err => this.showError(err));
    }
  }

  cancel() {
    this.canceled.emit(null);
    if (this.navigated) { window.history.back(); }
  }

  remove() {
    this.api.deleteContact(this.contact.ContactId).then(res => {
      if (this.navigated) { this.router.navigate(['/']); }
    });
  }

  goBack(savedItem: Contact = null) {
    this.saved.emit(savedItem);
    if (this.navigated) { window.history.back(); }
  }

  private showError(error) {
    let errObj = error.json();
    this.error += errObj.Message;
    if (errObj.ModelState['contact.Name']) {
      this.error += errObj.ModelState['contact.Name'][0];
    }

  }
}
