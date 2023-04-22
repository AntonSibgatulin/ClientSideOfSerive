import { Component, OnInit, Type } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  TypeResult  from 'src/app/com/antonsibgatulin/typeResult/TypeResult';
import  User  from 'src/app/com/antonsibgatulin/user/User';
import { Token } from '@angular/compiler';
import { MatDialogRef } from '@angular/material/dialog';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';
import Config from 'src/app/com/antonsibgatulin/configure/Config';
@Component({
  selector: 'app-authentificator',
  templateUrl: './authentificator.component.html',
  styleUrls: ['./authentificator.component.css']
})
export class AuthentificatorComponent implements OnInit{
  private typeResult = new TypeResult();

  private error!:string

  private state = AuthenticatorCompState.LOGIN;

  private url:string = new Config().url;
  constructor(private http:HttpClient,private matDilogRef:MatDialogRef<AuthentificatorComponent>){

  }
  
  onAuthClick(loginInput:HTMLInputElement,pass:HTMLInputElement){

    let login = loginInput.value;
    let password = pass.value;

    if( this.isNotEmpty(login) && this.isNotEmpty(password)){
      this.http.post<any>(this.url+"auth",{
          login:login,
          password:password
      }).subscribe(data=>{
        if(!this.authMe(data)){
          this.error = "Не правильный логин или пароль!"
        }



      })
    }

  }

 

  onLoginClick(){
    this.state = AuthenticatorCompState.LOGIN;
  }
  onCreateAccountClick(){
    this.state = AuthenticatorCompState.REGISTER;

  }
  isLoginStage(){
    return this.state == AuthenticatorCompState.LOGIN;
  }

  isRegisterStage(){
    return this.state == AuthenticatorCompState.REGISTER;
  }


  onRegisterClick(registerEmail:HTMLInputElement,
    registerPhone:HTMLInputElement,
    registerLogin:HTMLInputElement,
    registerPassword:HTMLInputElement,
    registerName:HTMLInputElement,
    registerSurname:HTMLInputElement){

      let email = registerEmail.value;
      let phone = registerPhone.value;
      let login = registerLogin.value;
      let password = registerPassword.value;
      let name = registerName.value;
      let surname = registerSurname.value;

      if(this.isNotEmpty(email) &&
      this.isNotEmpty(phone) &&
      this.isNotEmpty(login) &&
      this.isNotEmpty(password) &&
      this.isNotEmpty(name) &&
      this.isNotEmpty(surname)
      ){

        this.http.post<any>(this.url+"reg",
        {login:login,
          password:password,
          email:email,
          number:phone,
          name:name,
          surname:surname,
          typeUser:0
          
        }
        ).subscribe(data=>{
          var reg = this.authMe(data);

            if(!reg){
              if(data.code == 800){
                this.error = "Логин уже используется!";
              }
              else if(data.code == 801){
                this.error = "Номер уже используется!";
              }
              else if(data.code == 802){
                this.error = "Почта уже используется!";
              }else{
                this.error = data.message;
              }

            } 
         
        })

      }




  }


  authMe(data:any){
    this.typeResult = new TypeResult();

    Object.assign(this.typeResult,data);

    if(this.typeResult.isOK()){

      var user: User = new User();
      Object.assign(user,this.typeResult.user);
      localStorage.setItem("token",user.token);
      localStorage.setItem("me",JSON.stringify(user))
        this.matDilogRef.close();
        return user;
    }

    return false;

  }

  isNotEmpty(text:string){
    return text!=null && text.length>0;
  }

  

  getStateText(){
    switch(this.state){
      case AuthenticatorCompState.LOGIN:
        return "Авторизация"
      case AuthenticatorCompState.REGISTER:
        return "Регистрация"
      case AuthenticatorCompState.FORGOT_PASSWORD:
        return "Восстановление пароля"
      default:
        return "";
    }
  }


  isHaveError(){
    return this.error!=null && this.error.length>0
  }

  getError(){
    return this.error;
  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}


export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
