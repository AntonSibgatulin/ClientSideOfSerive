import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificatorComponent } from '../tools/authentificator/authentificator.component';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  private authLogic!:AuthLogic;

  constructor(private loginDilog:MatDialog,private http:HttpClient,private router:Router){
    this.authLogic =  new AuthLogic(http,router);
  }


  ngOnInit(): void {
    
  }

  onGetStartedClick(){
    if(this.authLogic.isAuth() == false){
    this.loginDilog.open(AuthentificatorComponent)
    }else{
      this.router.navigate(["profile"])
    }
  }
}
