import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificatorComponent } from './components/tools/authentificator/authentificator.component';
import { HttpClient } from '@angular/common/http';
import TypeResult from './com/antonsibgatulin/typeResult/TypeResult';
import Config from './com/antonsibgatulin/configure/Config';
import User from './com/antonsibgatulin/user/User';
import AuthLogic from './com/antonsibgatulin/tools/AuthLogic';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
 

  title = 'client';
  private config = new Config();
  private url:string = this.config.url;
  private authLogic!:AuthLogic;
  constructor(private matDilog:MatDialog,private http:HttpClient,private router:Router){
    this.authLogic = new AuthLogic(http,router)
  }

  onGetStartedClick(){
    this.matDilog.open(AuthentificatorComponent)
  }

  isAuth(){
   
    return this.authLogic.isAuth();
  }
}
