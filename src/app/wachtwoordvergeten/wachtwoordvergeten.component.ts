import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-wachtwoordvergeten',
  templateUrl: './wachtwoordvergeten.component.html',
  styleUrls: ['./wachtwoordvergeten.component.scss']
})
export class WachtwoordvergetenComponent implements OnInit {

  public wachtwoordVergetenFormulier: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.wachtwoordVergetenFormulier = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  verzendEmail() {
    alert(this.wachtwoordVergetenFormulier.value.email + '' + this.wachtwoordVergetenFormulier.value.wachtwoord);
  }

  getErrorMessage(errors: any): string {
    if (errors == null) {
      return;

    } else if (errors.required) {
      return  'Geef een emailadres in!';
    }
      
    else if (errors.email) {
      return `Dit is een ongeldig emailadres!`;
    }
  }

}
