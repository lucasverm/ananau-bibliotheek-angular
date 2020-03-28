import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-items-beheren',
  templateUrl: './items-beheren.component.html',
  styleUrls: ['./items-beheren.component.scss']
})
export class ItemsBeherenComponent implements OnInit {

  public items: Item[];
  public errorMessage: string = null;
  public successMessage: string = null;
  public naamSorteren: string = null;
  public toegevoegdOpSorteren: string = null;
  public beschikbaarSorteren: string = null;
  public filterFormulier: FormGroup;
  public itemFilter: string = "";
  public beschikbaarFilter: string = "";
  public loadingItems: Boolean = true;
  public itemsVanaf: number = 0;
  public aantalItems: number = 25;
  public totaalAantalItemsBeschikaar;
  public gearchiveerd: boolean = false;

  constructor(private itemService: ItemService, private router: Router, private fb: FormBuilder, ) { }

  ngOnInit() {
    this.filterFormulier = this.fb.group({
      itemNaam: [''],
      beschikbaar: ['beiden']
    })
    this.getItemMetFilterEnSorten();
  }

  verwijderItem(item:Item) {
    this.errorMessage = null;
    this.successMessage = null;
    this.itemService.deleteItem$(item).subscribe(
      val => {
        if (val) {
          this.getItemMetFilterEnSorten();
          this.successMessage = `Item "${item.naam}" werd verwijderd!`;
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );
  }

  archiveringAanpassen(item: Item) {
    this.errorMessage = null;
    this.successMessage = null;
    item.gearchiveerd = !item.gearchiveerd;
    this.itemService.putItem$(item).subscribe(
      val => {
        if (val) {
          this.getItemMetFilterEnSorten();
          if (item.gearchiveerd) {
            this.successMessage = `Item "${item.naam}" werd gearchiveerd!`;
          } else {
            this.successMessage = `Item "${item.naam}" werd terug gezet!`;
          }

        }
      },
      (error: HttpErrorResponse) => {
        item.gearchiveerd = !item.gearchiveerd;
        this.errorMessage = error.error;
      }
    );

  }

  clearForm() {
    this.itemFilter == null;
    this.beschikbaarFilter == null;
    this.filterFormulier.get('itemNaam').setValue("");
    this.filterFormulier.get('beschikbaar').setValue("beiden");
    this.gearchiveerd = false;
    this.filteren();
  }

  veranderItemsScope(naar: number) {
    this.itemsVanaf += (naar * this.aantalItems);
    this.getItemMetFilterEnSorten();
  }

  filteren() {
    this.loadingItems = true;
    this.itemFilter = this.filterFormulier.value.itemNaam;
    this.beschikbaarFilter = this.filterFormulier.value.beschikbaar;
    this.getItemMetFilterEnSorten();
  }

  aantalItemsVeranderen(value: number) {
    this.aantalItems = value;
    this.itemsVanaf = 0;
    this.getItemMetFilterEnSorten();
  }

  sorteren(atribuut: string) {
    this.loadingItems = true;
    if (atribuut == "naam") {
      this.beschikbaarSorteren = null;
      this.toegevoegdOpSorteren = null;
      if (this.naamSorteren == null) {
        this.naamSorteren = "asc";
      } else if (this.naamSorteren == "asc") {
        this.naamSorteren = "desc";
      } else {
        this.naamSorteren = null;
      }
    } else if (atribuut == "beschikbaar") {
      this.naamSorteren = null;
      this.toegevoegdOpSorteren = null;
      if (this.beschikbaarSorteren == null) {
        this.beschikbaarSorteren = "asc";
      } else if (this.beschikbaarSorteren == "asc") {
        this.beschikbaarSorteren = "desc";
      } else {
        this.beschikbaarSorteren = null;
      }
    } else if (atribuut == "toegevoegdOp") {
      this.naamSorteren = null;
      this.beschikbaarSorteren = null;
      if (this.toegevoegdOpSorteren == null) {
        this.toegevoegdOpSorteren = "asc";
      } else if (this.toegevoegdOpSorteren == "asc") {
        this.toegevoegdOpSorteren = "desc";
      } else {
        this.toegevoegdOpSorteren = null;
      }
    }
    this.getItemMetFilterEnSorten();
  }

  redirectTo(item: any) {
    this.router.navigate([`../item/${item.id}`]);
  }

  getItemMetFilterEnSorten() {
    this.errorMessage = null;
    this.successMessage = null;
    this.itemService.getItemsWithFilter$(
      this.itemsVanaf,
      this.aantalItems,
      this.naamSorteren == "asc",
      this.naamSorteren == "desc",
      this.beschikbaarSorteren == "asc",
      this.beschikbaarSorteren == "desc",
      this.toegevoegdOpSorteren == "asc",
      this.toegevoegdOpSorteren == "desc",
      this.itemFilter,
      this.beschikbaarFilter, this.gearchiveerd).subscribe(
        val => {
          if (val) {
            this.loadingItems = false;
            this.items = val["items"];
            this.totaalAantalItemsBeschikaar = val["totaal"];
          }
        },
        error => {
          this.errorMessage = error.error;
        }
      )
  }

}
