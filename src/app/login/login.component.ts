import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, FormArray, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginFormulier: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.loginFormulier = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  logGebruikerIn() {
    alert(this.loginFormulier.value.email + '' + this.loginFormulier.value.password);
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
