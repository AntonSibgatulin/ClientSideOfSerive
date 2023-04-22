
export default class TypeResult{
    message!:string
    code!:Number
    type!:string

    user!:any


    isOK(){
        return this.message == "ok"
    }

    
}