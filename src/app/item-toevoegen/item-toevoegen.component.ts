import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ItemService } from '../services/item.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-item-toevoegen',
  templateUrl: './item-toevoegen.component.html',
  styleUrls: ['./item-toevoegen.component.scss']
})
export class ItemToevoegenComponent implements OnInit {

  public itemToevoegenFormulier: FormGroup;
  public successMessage: string = null;
  public errorMessage: string = null;

  constructor(public router: Router, private fb: FormBuilder, private itemService: ItemService) {
  }

  ngOnInit() {
    this.itemToevoegenFormulier = this.fb.group({
      naam: ['', [Validators.required]]
    })
  }

  itemToevoegen() {
    this.itemService.addItem$(this.itemToevoegenFormulier.value.naam).subscribe(
      val => {
        if (val) {
          this.router.navigate([`../item/${val.id}`],{ state: { successMessage: 'Item toevoegen gelukt!' } });
        }
      },
      (error: HttpErrorResponse) => {
        this.errorMessage = error.error;
      }
    );

  }
}
