import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { Gebruiker } from '../models/gebruiker';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss']
})
export class TopbarComponent implements OnInit {
  public aangemelde: Gebruiker;

  constructor(private router: Router, private accountService: AccountService) { }

  ngOnInit() {
    this.accountService.huidigeGebruiker.subscribe(t => {
      this.aangemelde = t;
    });
  }

  public redirect(directory: string): void {
    this.router.navigate([`/${directory}`]);
  }

  public afmelden(): void {
    this.accountService.logout();
    this.router.navigate([`/login`])
  }

}
