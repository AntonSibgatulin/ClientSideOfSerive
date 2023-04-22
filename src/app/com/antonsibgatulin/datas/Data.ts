import User from "../user/User";

export default class Data{

    constructor(public user:User){

    }
    isHaveToken(){
        return this.user.isHaveToken()
    }
}