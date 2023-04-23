import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';

import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import {MatDialogModule} from "@angular/material/dialog";
import {MatIconModule} from '@angular/material/icon';



import { AuthentificatorComponent } from './components/tools/authentificator/authentificator.component';
import { ProfileComponent } from './components/profile/profile.component';



@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthentificatorComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    BrowserAnimationsModule,
    MatBottomSheetModule,
    MatCardModule,
    MatDialogModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
