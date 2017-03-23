import { Component, OnInit } from '@angular/core';
import {MdUniqueSelectionDispatcher} from '@angular2-material/core';
import {MD_BUTTON_DIRECTIVES} from '@angular2-material/button';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'app-header-buttons',
  templateUrl: 'header-buttons.component.html',
  styleUrls: ['header-buttons.component.css'],
  providers: [MdUniqueSelectionDispatcher],
  directives: [MD_BUTTON_DIRECTIVES]
})
export class HeaderButtonsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }


}
