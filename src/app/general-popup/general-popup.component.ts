import {Component, ContentChild, Input, OnInit, TemplateRef} from '@angular/core';

@Component({
  selector: 'app-general-popup',
  templateUrl: './general-popup.component.html',
  styleUrls: ['./general-popup.component.css']
})
export class GeneralPopupComponent implements OnInit {
  notify: string;

  constructor() { }

  ngOnInit() {
  }

}
