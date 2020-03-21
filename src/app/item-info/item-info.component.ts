import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-info',
  templateUrl: './item-info.component.html',
  styleUrls: ['./item-info.component.scss']
})
export class ItemInfoComponent implements OnInit {
  @Input() item: Item;
  @Input() itemAanHetLaden: Boolean;

  constructor() { }

  ngOnInit() {}

}

