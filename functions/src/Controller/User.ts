import { Request,Response } from "express";
import { UserModel,User } from "../Models/User";
import { CustomerRequest } from "../Utils/Request";

const userSignUp = async (req:Request,res:Response) => {
       const {  mobileNumber, email, disPlayName, firstName, lastName } = req.body; 
       try{
            console.log("mobileNumber",mobileNumber,"email",email,"disPlayName",disPlayName);
            const userModel = new UserModel()
            const user : User = {
                mobileNumber : mobileNumber,    
                disPlayName : disPlayName==null?firstName:disPlayName,
                firstName : firstName,
                lastName : lastName,
                email : email    
            }
            await userModel.createUser(user);
            return res.status(200).send({
                        status: 'success'
                    })

        }catch{
            return res.status(500).json({ error:"Error While New User" })
        }
}

const userSignIn = async (req:CustomerRequest,res:Response) => {
    try{
            const email = req.user?.email
            const userModel = new UserModel()
            const isValidUser = await userModel.checkUser(email);
            if(isValidUser == true){
                return res.status(200).send({
                            status: 'success'
                        })
            }
            else{
                return res.status(403).json({ error: 'Unauthorized'});
            }
    }catch(error){
        return res.status(500).json({ error:"Error While Authorizing User" })
    }
}

export {userSignUp,userSignIn}