import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Item } from '../models/item';
import { _ } from 'underscore';
import { GebruikerItem } from '../models/gebruiker-item';


@Component({
  selector: 'app-item-page',
  templateUrl: './item-page.component.html',
  styleUrls: ['./item-page.component.scss']
})
export class ItemPageComponent implements OnInit {
  public item: Item;
  public vanafGebruikerItems: number = 0;
  public loading: Boolean;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.item = data['item'];
    });
  }

  getGebruikerItems() {
    var uitvoer = _.sortBy([...this.item.gebruikerItems], 'ontleendOp').reverse();
    return uitvoer.splice(this.vanafGebruikerItems, this.vanafGebruikerItems + 10);
  }

  veranderGebruikerItemsScope(naar: number) {
    this.vanafGebruikerItems += (naar * 10);
  }

  ngOnInit() {
  }

}
