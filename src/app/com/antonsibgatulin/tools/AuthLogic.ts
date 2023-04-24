import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import TypeResult from "../typeResult/TypeResult";
import Config from "../configure/Config";
import User from "../user/User";
export default class AuthLogic{

    private http!:HttpClient;
    private router!:Router;
    public config = new Config();

    public user!:User ;

    auth = false;
    lastCheck = 0;
  

    constructor(http:HttpClient,router:Router){
        this.http = http;
        this.router = router;
    }

    checkAuth(typeResult:TypeResult){


        //if()

        
    }
    getToken(){
        this.isAuth();
        return localStorage.getItem("token");
    }

    isMine(id:number){
        if(this.user==null){
            if(localStorage.getItem("me")== null){
                return false;
            }
            var user = new User();
            Object.assign(user,localStorage.getItem("me"));
            return user.id == id;
        }else{
            return this.user.id == id;
        }
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
        
        this.user= new User()
        Object.assign(this.user,typeResult.user);
        localStorage.setItem("me",JSON.stringify(this.user));
        this.auth = true;
       
      }else{
            localStorage.removeItem("token");
            localStorage.removeItem("me");
            this.router.navigate([''])
      }

    });

        return true;
    }
    unAuth(){
        localStorage.removeItem("token")


    }

}