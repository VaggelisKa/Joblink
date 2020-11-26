import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Params } from '@angular/router';

@Component({
  selector: 'app-dropdown-filter',
  templateUrl: './dropdown-filter.component.html',
  styleUrls: ['./dropdown-filter.component.css']
})
export class DropdownFilterComponent implements OnInit {
  @Input() dropdownName: string;

  @Input() btn1RadioName: string;
  @Input() btn2RadioName: string;
  @Input() btn3RadioName: string;

  @Input() field1Name: string;
  @Input() field2Name: string;
  @Input() field3Name: string;
  
  @Input() params: Params;
  @Output() filterClicked = new EventEmitter();

  constructor() { }

  ngOnInit() {
    
  }

  onClick(): void {
    this.filterClicked.emit(this.params);
  }

}
