import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-scan-item',
  templateUrl: './scan-item.component.html',
  styleUrls: ['./scan-item.component.scss']
})
export class ScanItemComponent implements OnInit {

  public loading: Boolean;
  
  constructor() { }

  ngOnInit() {
  }

}
