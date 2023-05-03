import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Config from 'src/app/com/antonsibgatulin/configure/Config';
import AuthLogic from 'src/app/com/antonsibgatulin/tools/AuthLogic';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})



export class SettingsComponent implements OnInit{
  public authLogic!:AuthLogic;
  public config:Config = new Config();
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


  update(name:HTMLInputElement,surname:HTMLInputElement,
    number:HTMLInputElement,email:HTMLInputElement,start:HTMLSelectElement,
    end:HTMLSelectElement,minDesc:HTMLInputElement,desc:HTMLTextAreaElement,
    days:HTMLElement,payment:HTMLElement){

      var n = name.value;
      var s = surname.value;
      var num = number.value;
      var mail = email.value;

      var st = start.value;
      var en = end.value;

      var minDescription = minDesc.value;
      var description = desc.value;

      var d1 = <HTMLInputElement>days.children[0].children[0];
      var d2 = <HTMLInputElement>days.children[1].children[0];
      var d3 = <HTMLInputElement>days.children[2].children[0];
      var d4 = <HTMLInputElement>days.children[3].children[0];
      var d5 = <HTMLInputElement>days.children[4].children[0];
      var d6 = <HTMLInputElement>days.children[5].children[0];
      var d7 = <HTMLInputElement>days.children[6].children[0];

      var day = (d1.checked)+"&"+(d2.checked)+"&"+(d3.checked)+"&"+(d4.checked)
      +"&"+(d5.checked)
      +"&"+(d6.checked)
      +"&"+(d7.checked)

      var type1 = <HTMLInputElement>payment.children[0].children[0];
      var type2 = <HTMLInputElement>payment.children[1].children[0];
      var type3 = <HTMLInputElement>payment.children[2].children[0];

      var type = 0;

      if(type1.checked){
        type = Number(type1.value);
        
      }
      if(type2.checked){
        type = Number(type2.value);
        
      }
      if(type3.checked){
        type = Number(type3.value);
        
      }

      console.log(day)

      if(this.isNull(n)){
          this.error(name);
      }

      else if(this.isNull(s)){
        this.error(surname);
      }
      else if(this.isNull(num)){
        this.error(number)
      }
      else if(this.isNull(mail)){
        this.error(email)
      }
      else if(minDescription.length >60){
        this.error(minDesc)
      }else if(description.length > 4096){
        this.error(desc);
      }else{


      this.http.post(this.config.url+"profile/save",{
          day:day,
          start:st,
          end:en,
          name:n,
          surname:s,
          minDescription:minDescription,
          description:description,
          typePayment:type,
          token:this.authLogic.getToken()

      }).subscribe(data=>{
          console.log(data);

      });

      }


  }
  error(object:any){

  }

  isNull(name:string){
    return name == null;
  }
}
