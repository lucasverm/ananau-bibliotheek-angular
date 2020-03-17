import { Component, OnInit, Input } from '@angular/core';
import { GebruikerItem } from '../models/gebruiker-item';

@Component({
  selector: 'app-uitgeleende-boeken-tabel',
  templateUrl: './uitgeleende-boeken-tabel.component.html',
  styleUrls: ['./uitgeleende-boeken-tabel.component.scss']
})
export class UitgeleendeBoekenTabelComponent implements OnInit {

  @Input() public items: GebruikerItem[];
  @Input() public startNummer: Boolean;

  constructor() { }

  ngOnInit() {

  }

}
