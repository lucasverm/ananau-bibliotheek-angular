import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { OntleenService } from '../services/ontleen.service';
import { Item } from '../models/item';
import { GebruikerItem } from '../models/gebruiker-item';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {

  public loadingError: HttpErrorResponse;
  public loading: boolean;
  public ontleendeItems: GebruikerItem[];

  constructor(private _ontleenService: OntleenService, ) {
    this.geefOntleendeBoeken()
   }

  ngOnInit() {
  }

  geefOntleendeBoeken() {
    this._ontleenService
      .getOntleendeBoekenVanGebruiker()
      .subscribe(
        val => {
          this.loading = true;
          if (val) {
            this.ontleendeItems = val;
            console.log(this.ontleendeItems)
          }
          this.loading = false;
        },
        error => {
          this.loadingError = error;
        }
      );
  }

}
