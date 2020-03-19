import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { TopbarComponent } from './topbar/topbar.component';
import { LanguageComponent } from './language/language.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistreerComponent } from './registreer/registreer.component';
import { WachtwoordvergetenComponent } from './wachtwoordvergeten/wachtwoordvergeten.component';
import { OverviewComponent } from './overview/overview.component';
import { httpInterceptorProviders } from './http-inceptors';
import { UitgeleendeBoekenTabelComponent } from './uitgeleende-boeken-tabel/uitgeleende-boeken-tabel.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { ItemPageComponent } from './item-page/item-page.component';
import { GebruikerItemsTabelComponent } from './gebruiker-items-tabel/gebruiker-items-tabel.component';
import { ScanItemComponent } from './scan-item/scan-item.component';
import { QRCodeModule } from 'angular2-qrcode';
import { ZXingScannerModule } from '@zxing/ngx-scanner';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    LanguageComponent,
    RegistreerComponent,
    WachtwoordvergetenComponent,
    OverviewComponent,
    UitgeleendeBoekenTabelComponent,
    PageNotFoundComponent,
    SidemenuComponent,
    ItemPageComponent,
    GebruikerItemsTabelComponent,
    ScanItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    QRCodeModule,
    ZXingScannerModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
