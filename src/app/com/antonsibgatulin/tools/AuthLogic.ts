import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import TypeResult from "../typeResult/TypeResult";
import Config from "../configure/Config";
import User from "../user/User";
export default class AuthLogic{

    private http!:HttpClient;
    private router!:Router;
    private config = new Config();

    auth = false;
    lastCheck = 0;
  

    constructor(http:HttpClient,router:Router){
        this.http = http;
        this.router = router;
    }

    checkAuth(typeResult:TypeResult){


        //if()

        
    }

    isAuth()
    {
        let token = localStorage.getItem("token");
        if(token == null || token.length==0)return false;


        if(this.auth && Date.now() - this.lastCheck < 1000*60*60){
            return true;
        }

          
            this.lastCheck = Date.now()
          
      



        var typeResult = new TypeResult();

    this.http.post<any>(this.config.url+"get/userByToken",{token:token}).subscribe(data => {

      Object.assign(typeResult,data)
      if(typeResult.message == "ok"){
        
        var user = new User()
        Object.assign(user,typeResult.user);
        localStorage.setItem("me",JSON.stringify(user));
        this.auth = true;
       
      }else{
            localStorage.removeItem("token");
            localStorage.removeItem("me");
            this.router.navigate(['home'])
      }

    });

        return true;
    }

}