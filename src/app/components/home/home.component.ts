import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificatorComponent } from '../tools/authentificator/authentificator.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  constructor(private loginDilog:MatDialog){}


  ngOnInit(): void {
    
  }

  onGetStartedClick(){
    this.loginDilog.open(AuthentificatorComponent)
  }
}
