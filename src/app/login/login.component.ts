import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';
import { HttpErrorResponse } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  public errorMessage: string;
  public loginCredential: string;
  public password: string;
  public loading: Boolean;
  public loginFormulier: FormGroup;


  constructor(public router: Router, private fb: FormBuilder, private accountService: AccountService, public translate: TranslateService) {
    if (this.router.getCurrentNavigation().extras.state != undefined) {
      this.errorMessage = this.router.getCurrentNavigation().extras.state.errorMessage;
    }
  }

  ngOnInit() {
    this.loginFormulier = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      wachtwoord: ['', Validators.required]
    })
  }

  public logGebruikerIn(): void | string {
    this.loginCredential = this.loginFormulier.value.email
    this.password = this.loginFormulier.value.wachtwoord
    if (!this.loginCredential || !this.password) {
      this.errorMessage = 'Gelieve een wachtwoord en/of gebruikersnaam in te vullen';
      return;
    }
    this.accountService.login(this.loginCredential, this.password).subscribe(
      value => {
        this.loading = true;
        if (value) {
          if (this.accountService.redirectUrl) {
            this.router.navigateByUrl(this.accountService.redirectUrl);
            this.accountService.redirectUrl = undefined;
          } else {
            this.accountService.huidigeGebruiker.subscribe(val => {
              this.router.navigate(['/overview']);
            })

          }
        }
        this.loading = false;
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          this.errorMessage = `${err.error} `;
        } else if (err.status == 0) {
          this.errorMessage = `Onbekende error: probeer het later opnieuw!`;
        } else if (err.error instanceof ProgressEvent) {
          this.errorMessage = `${err.statusText} `;
        } else {
          this.errorMessage = `${err.error} `;
        }
      }
    );
  }

  getErrorMessage(errors: any, veldNaam: string): string {
    if (errors == null) {
      return;

    } else if (errors.required) {
      return veldNaam + ' is verplicht';

    } else if (errors.minlength) {
      return `needs at least ${errors.minlength.requiredLength} 
      characters (got ${errors.minlength.actualLength})`;

    } else if (errors.email) {
      return `Dit is een ongeldig emailadres!`;
    }
  }
}
