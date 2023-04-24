import { Component, OnInit } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificatorComponent } from '../tools/authentificator/authentificator.component';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';
import { HttpClient } from '@angular/common/http';
import { Route, Router } from '@angular/router';
import User from 'src/app/com/antonsibgatulin/user/User';


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

      var object = this;
      var user = this.authLogic.getAuthFromCookie();
      if(user == null){
        this.loginDilog.open(AuthentificatorComponent)
        return;
      }
      var json = JSON.parse(user)
      var userModel = new User();
      Object.assign(userModel,json);

      object.router.navigate(["profile",userModel.userId])
   
      
     }
  }
}
