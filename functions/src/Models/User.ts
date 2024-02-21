import { Location } from "./Location"
import { USER_COLLECTION } from "../collectionPath"
import { db } from "../config/firebase"

interface User{
    id?:string,
    mobileNumber:string,
    email:string,
    disPlayName:string,
    firstName:string,
    lastName:string,
    middleName?:string,
    location?:Location
}

export class UserModel{
    private collectionPath:string;
    constructor(){
       this.collectionPath = USER_COLLECTION 
    }
    async isEmailOrMobileNumberTaken(mobileNumber: string,email: string): Promise<boolean> {
        const emailQuery = await db.collection(this.collectionPath).where('email', '==', email).get();
        if (!emailQuery.empty) {
            console.log("email already present",email)
            return true; 
        }
        const mobileQuery = await db.collection(this.collectionPath).where('mobileNumber', '==', mobileNumber).get();
        if (!mobileQuery.empty) {
            console.log("email already present",mobileNumber)
            return true; 
        }
        return false; 
    }
    async createUser(user:User){
        // checkig mobil number or email already present
        const isMobileNumberOrEmailAlreadyPresent = await this.isEmailOrMobileNumberTaken(user.mobileNumber,user.email);    
        try{
            if(isMobileNumberOrEmailAlreadyPresent == true){
                throw new Error("Mobile or Email already Exist")
            }
            const entry = db.collection(this.collectionPath).doc()
            user.id = entry.id
            await db.collection(this.collectionPath).doc(user.id).set(user);
        }catch(error){
            console.log("createUser Error ::",error)
            throw error
        }
    }
    async checkUser(email:string|any){
        try{
            const userIdQuery = await db.collection(this.collectionPath).where('email', '==', email).get();
            if(userIdQuery.empty){
                return false;
            }
            return true 
        }catch(error){
           console.log(`Error log email ${email}`,error)  
           return false
        }
    }
}
export {User}