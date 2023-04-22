import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { AuthentificatorComponent } from './components/tools/authentificator/authentificator.component';
import { HttpClient } from '@angular/common/http';
import TypeResult from './com/antonsibgatulin/typeResult/TypeResult';
import Config from './com/antonsibgatulin/configure/Config';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'client';
  private url:string = new Config().url;
  constructor(private matDilog:MatDialog,private http:HttpClient){

  }

  onGetStartedClick(){
    this.matDilog.open(AuthentificatorComponent)
  }

  isAuth(){
    if(localStorage.getItem("token") == null )return false;
    var token = localStorage.getItem("token")

    var typeResult = new TypeResult();

    this.http.post<any>(this.url+"get/userByToken",{token:token}).subscribe(data => {

      Object.assign(typeResult,data)
      if(typeResult.message == "ok"){
        
        return true;
      }

    });

  

    

    return false;
  }
}
