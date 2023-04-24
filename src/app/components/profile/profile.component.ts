import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params, Router } from '@angular/router';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';
import User from 'src/app/com/antonsibgatulin/user/User';
import TypeResult from 'src/app/com/antonsibgatulin/typeResult/TypeResult';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private authLogic!:AuthLogic;

  private name:string = 'Loading....';
  private user!:User ;

  private error = false;
  private textError = '';
  constructor(private http:HttpClient,private router:Router,private route:ActivatedRoute){
    this.authLogic = new AuthLogic(http,router);
  
  }
  isError(){
    return this.error;
  }
  getTextError(){
    return this.textError;
  }
  getName(){
    return this.name
  }

  getDescription(){
    if(this.user==null){
      return '';
    }else{
      return this.user.account.description;
    }
  }
  


  getMinDescription(){
    if(this.user==null){
      return '';
    }else{
      return this.user.account.minDescription;
    }
  }
  
/*
  getLastOnline(){
    if(this.user==null){
      return '';
    }else{
      return this.user.account.
    }
  }
*/

getTextOnline(){
  if(this.isOnline()==true){
    return "Онлайн"
  }else{
    return "Оффлайн"
  }
}

getTextTypeUser(){
  if(this.user==null){
    return 'Loding ...'
  }
  if(this.user.typeUser == 0){
    return "Продавец"
  }else{
    return "Исполнитель"
  }
}

getTextPhoneTrue(){
  if(this.user==null){
    return 'Loading...';
  }

  if(this.user.account.phoneTrue){
    return "Телефон не подтверждён"
  }else{
    return "Телефон подтверждён"
  }

}

  isOnline(){
    if(this.user==null){
      return false;
    }


    var dt = Date.now();
    if(dt<60000){
      return true;
    }else{
      return false;

    }

  }
  isMine(){
    return this.authLogic.isMine(this.user.userId);
  }
  

  ngOnInit(): void {
    console.log("ngOnInit()")
    this.route.params.subscribe((params: Params) => {
      let id = params['id']

      this.http.post<any>(this.authLogic.config.url+"get/userById",{token:this.authLogic.getToken(),id_user:id}).subscribe(data => {
        var typeResult = new TypeResult();
        Object.assign(typeResult,data)
        if(typeResult.message == "ok"){
          
          this.user= new User()
          Object.assign(this.user,typeResult.user);
          console.log(this.user)
          this.name = this.user.name+" "+this.user.surname
         
        }else{
          this.error = true;
            if(typeResult.code == 404){
              this.textError = 'Пользователь не найден!'
            }else{
              this.router.navigate(["**"])
            }
        }
  
      });

    });
  }

}
