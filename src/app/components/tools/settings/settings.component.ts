import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})



export class SettingsComponent implements OnInit{
  public authLogic!:AuthLogic;
  constructor(private http:HttpClient,private router:Router){
    this.authLogic = new AuthLogic(http,router);
    this.authLogic.isAuth();
  }


  getLogin(){
    return this.authLogic.user.login;
  }

  getName(){
    return this.authLogic.user.name
  }

  getSurName(){
    return this.authLogic.user.surname
  }

  getNumber(){
    return this.authLogic.user.number
  }
  
  getMail(){
    return this.authLogic.user.email;
  }


  getMinDescription(){
    return this.authLogic.user.account.minDescription;
  }

  getDescription(){
    return this.authLogic.user.account.description;
  }
  
  
  ngOnInit(): void {
   
  }

}
