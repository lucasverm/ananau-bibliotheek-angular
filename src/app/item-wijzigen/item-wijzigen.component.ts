import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Item } from '../models/item.model';

@Component({
  selector: 'app-item-wijzigen',
  templateUrl: './item-wijzigen.component.html',
  styleUrls: ['./item-wijzigen.component.scss']
})
export class ItemWijzigenComponent implements OnInit {
  public item: Item;
  public itemWijzigenFormulier: FormGroup;
  public errorMessage: string;

  constructor(public router: Router, public route: ActivatedRoute, private fb: FormBuilder, private itemService: ItemService) {
    this.route.data.subscribe(data => {
      this.item = data['item'];
    });
  }

  ngOnInit() {
    this.itemWijzigenFormulier = this.fb.group({
      naam: [this.item.naam, [Validators.required]]
    })
  }

  itemWijzigen() {
    this.item.naam = this.itemWijzigenFormulier.value.naam;
    this.itemService.putItem$(this.item).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../item/${val.id}`],{ state: { successMessage: 'Item gewijzigd!' } });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );

  }
}
