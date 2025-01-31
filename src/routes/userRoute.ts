import express, { request, response } from "express";
import { login, register } from "../services/userServices";

const userRouter = express.Router()
userRouter.post('/register',async(request, resopnse) => {
    try{
        const { firstName, lastName, email, password } = request.body;

        const {statusCode,data} = await register({firstName,
            lastName,
            email,
            password,});
        resopnse.status(statusCode).send(data)
    }catch{
        resopnse.status(500).send('already used')
    }
   
})
userRouter.post('/login',async(request,response)=>{
    try{
        const{email,password} =request.body;
        const{statusCode,data} = await login({email,password})
        response.status(statusCode).send(data);
    }catch{
        response.status(500).send("the mail or password is incorrect")
    }
   
})
export default userRouter;
