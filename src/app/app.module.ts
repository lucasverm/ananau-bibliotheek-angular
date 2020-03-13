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

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TopbarComponent,
    LanguageComponent,
    RegistreerComponent,
    WachtwoordvergetenComponent,
    OverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
