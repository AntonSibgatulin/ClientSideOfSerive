import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private authLogic!:AuthLogic;

  constructor(private http:HttpClient,private router:Router){
    this.authLogic = new AuthLogic(http,router);

  }

  

  ngOnInit(): void {
    
  }

}
