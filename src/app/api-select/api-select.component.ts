import { Component, OnInit } from '@angular/core';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_CHECKBOX_DIRECTIVES} from '@angular2-material/checkbox';
import { ApiService } from '../api.service';

const privateApiUrl = [
  "http://localhost/UOF/Angular2QuizBackend/api/Contacts",
  "http://localhost/UOF/Angular2QuizBackend/api/ContactClasses"
];

const publicApiUrl = [
  "http://172.16.3.85/Quiz/api/Contact",
  "http://172.16.3.85/Quiz/api/Class"];

@Component({
  moduleId: module.id,
  selector: 'app-api-select',
  templateUrl: 'api-select.component.html',
  styleUrls: ['api-select.component.css'],
  providers: [MdUniqueSelectionDispatcher],
  directives: [MD_CHECKBOX_DIRECTIVES]
})
export class ApiSelectComponent implements OnInit {

  isPrivate = true;
  text: string;

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.isPrivate = this.api.isPrivate;
    this.text = this.isPrivate ? "Private" : "Public";
    this.setUrl();
  }

  change() {
    this.isPrivate = !this.isPrivate;
    this.text = this.isPrivate ? "Private" : "Public";

    this.api.isPrivate = this.isPrivate;
    this.setUrl();
  }

  setUrl(){
    this.api.contactApiUrl = this.isPrivate
    ? privateApiUrl[0]
    : publicApiUrl[0];

    this.api.classApiUrl = this.isPrivate
    ? privateApiUrl[1]
    : publicApiUrl[1];

  }
}
