
import Money from "../money/Money";
import Account from "../account/Account";



export default class User{
    id!:number
    login!:string
    email!:string
    number!:string
    name!:string
    surname!:string
    typeUser!:number
    type!:number
    timeReg!:number
    timeLastOnline!:number

    account!:Account

    money!:Money

    token!:string

    constructor(){

    }

    isHaveToken(){
        return this.token!=null;
    }


}