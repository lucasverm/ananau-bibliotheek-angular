import { Component, OnInit } from '@angular/core';
import { Subject, Observable, of } from 'rxjs';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup, ValidatorFn, AbstractControl } from '@angular/forms';
import { AccountService } from '../services/account.service';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Item } from '../models/item.model';
import { OntleenService } from '../services/ontleen.service';
import { GebruikerItem } from '../models/gebruiker-item.model';

@Component({
  selector: 'app-scan-item',
  templateUrl: './scan-item.component.html',
  styleUrls: ['./scan-item.component.scss']
})

export class ScanItemComponent implements OnInit {

  public that = this;
  public errorMessage: string;
  public succesMessage: string;
  public loading: Boolean;
  public scanFormulier: FormGroup;
  public zoekResultaat: Item[] = [];
  public geselecteerdItem: Item;
  public itemNamenAanHetInladen: Boolean = false;
  public itemAanHetLaden: Boolean = false;

  constructor(public router: Router, private fb: FormBuilder, private ontleenService: OntleenService, private itemService: ItemService) { }

  ngOnInit() {
    this.scanFormulier = this.fb.group({
      id: ['', [Validators.required], this.serverSideValidateUsername(this.itemService.getItemByName$)]
    })
  }

  scanButtonText(): string {
    if (this.geselecteerdItem.beschikbaar) {
      return "Onteen dit item!"
    } else {
      return "Breng item terug!"
    }

  }

  scanItem() {
    this.errorMessage = null;
    this.succesMessage = null;
    this.ontleenService.scanItemIn$(this.geselecteerdItem.id).subscribe(
      val => {
        if (val) {
          var gebruikerItem = GebruikerItem.fromJSON(val);
          if (gebruikerItem.TerugOp == undefined) {
            this.succesMessage = `Het item "${gebruikerItem.item.naam}" werd door jou ontleend op: ${this.formatDate(gebruikerItem.OntleendOp)}!`
          } else {
            this.succesMessage = `Het item "${gebruikerItem.item.naam}" werd door jou terug gebracht op: ${this.formatDate(gebruikerItem.TerugOp)}!`
          }
          this.itemService.getItem$(this.geselecteerdItem.id).subscribe(
            val => {
              if (val) {
                this.geselecteerdItem = val;
              }
            },
            error => {
              this.errorMessage = error.error;
            }
          )
        }

      },
      error => {
        console.log(error);
        this.errorMessage = error.error;
      }
    );
  }

  public formatDate(datum: Date): string {
    var uitvoer = "";
    uitvoer += datum.getHours() + ":" + datum.getMinutes() + " - " + datum.getDate() + "/" + (datum.getMonth() + 1) + "/" + datum.getFullYear();
    return uitvoer;
  }

  public gekozenItem(e: string): void {
    this.itemAanHetLaden = true;
    if (e) {
      this.geselecteerdItem = this.zoekResultaat.find(
        g => g.naam === e
      );
    }
    this.itemAanHetLaden = false;
  }

  serverSideValidateUsername(
    checkAvailabilityFn: (n: string) => Observable<Item[]>
  ): ValidatorFn {
    return (control: AbstractControl): Observable<{ [key: string]: any }> => {
      this.itemNamenAanHetInladen = true;
      this.geselecteerdItem = null;
      this.errorMessage = null;
      this.succesMessage = null;
      return checkAvailabilityFn(control.value).pipe(
        catchError(error => {
          this.errorMessage = error.error;
          this.itemNamenAanHetInladen = false;
          return of(null);
        }),
        map((items: any[]) => {
          if (items) {
            items = items.map(Item.fromJSON)
            this.zoekResultaat = items;
            this.itemNamenAanHetInladen = false;
            return of(null);
          }
        })
      );
    };
  }
}