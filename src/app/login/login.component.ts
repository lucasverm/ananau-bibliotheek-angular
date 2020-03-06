import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from '../services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormulier: FormGroup;

  constructor(private fb: FormBuilder, private accountService: AccountService){}

  ngOnInit() {
    this.loginFormulier = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      wachtwoord: ['', Validators.required]
    })
  }

  logGebruikerIn() {
    alert(this.loginFormulier.value.email + '' + this.loginFormulier.value.wachtwoord);
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
