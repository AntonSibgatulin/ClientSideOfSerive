import { Component, OnInit, Type } from '@angular/core';
import { Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  TypeResult  from 'src/app/com/antonsibgatulin/typeResult/TypeResult';
import  User  from 'src/app/com/antonsibgatulin/user/User';
@Component({
  selector: 'app-authentificator',
  templateUrl: './authentificator.component.html',
  styleUrls: ['./authentificator.component.css']
})
export class AuthentificatorComponent implements OnInit{
  private typeResult = new TypeResult();

  private state = AuthenticatorCompState.LOGIN;
  private url = "http://localhost:8080/api/v1/";
  constructor(private http:HttpClient){

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
         this.typeResult = new TypeResult();

        Object.assign(this.typeResult,data);

        if(this.typeResult.isOK()){

          var user: User = new User();
          Object.assign(user,this.typeResult.user);
          console.log(user.isHaveToken())

        }
         
        })

        



      }




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

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  

}


export enum AuthenticatorCompState{
  LOGIN,
  REGISTER,
  FORGOT_PASSWORD
}
