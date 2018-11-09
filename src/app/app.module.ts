import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AugmentedComponent } from './augmented/augmented.component';
import { AppRoutingModule } from './/app-routing.module';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { OverviewComponent } from './overview/overview.component';
import { DetailComponent } from './detail/detail.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateComponent } from './create/create.component';
import {environment} from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { DimensionComponent } from './dimension/dimension.component';
import { HeaderComponent } from './nav/header/header.component';
import { QrComponent } from './qr/qr.component';
import { QRCodeModule } from 'angularx-qrcode';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AugmentedComponent,
    OverviewComponent,
    DetailComponent,
    CreateComponent,
    DimensionComponent,
    HeaderComponent,
    QrComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule, // imports firebase/database, only needed for database features
    QRCodeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
