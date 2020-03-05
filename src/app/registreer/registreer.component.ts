import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.scss']
})
export class RegistreerComponent implements OnInit {

  public registreerFormulier: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.registreerFormulier = this.fb.group({
      voornaam: ['', [Validators.required]],
      achternaam: ['', [Validators.required]],
      telefoon: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      geboorteDatum: ['', [Validators.required]],
      wachtwoord: ['', Validators.required],
      herhaalWachtwoord: ['', [Validators.required]],
    })
  }

  registreerNieuweGebruiker() {
    alert(this.registreerFormulier.value.email + '' + this.registreerFormulier.value.password);
  }

}
