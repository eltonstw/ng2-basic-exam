import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChange } from '@angular/core';
import {MD_CARD_DIRECTIVES} from '@angular2-material/card';
import { ApiService } from '../api.service';
import { ContactClass } from '../contact-class';

@Component({
  moduleId: module.id,
  selector: 'app-class-select',
  templateUrl: 'class-select.component.html',
  styleUrls: ['class-select.component.css'],
  directives: [MD_CARD_DIRECTIVES]
})
export class ClassSelectComponent implements OnInit {

  classes: ContactClass[];
  selectedId: string;

  @Output()
  itemChanged = new EventEmitter();

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.getClasses();
  }

  getClasses() {
    this.api.getClasses()
      .then(res => {
        this.classes = res;
        if (this.classes && this.classes.length > 0) {
          this.selectedId = this.classes[0].ClassId;
          this.itemChanged.emit(this.selectedId);
        }
      });
  }

  onChange(newValue) {
    this.selectedId = newValue;  // don't forget to update the model here
    this.itemChanged.emit(this.selectedId);
    console.log("after emit: " + this.selectedId);
  }
}
