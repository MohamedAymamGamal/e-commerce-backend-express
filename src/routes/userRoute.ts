import express, { request, response } from "express";
import { login, register } from "../services/userServices";

const userRouter = express.Router()
userRouter.post('/register',async(request, resopnse) => {
    const { firstName, lastName, email, password } = request.body;

    const {statusCode,data} = await register({firstName,
        lastName,
        email,
        password,});
    resopnse.status(statusCode).send(data)
})
userRouter.post('/login',async(request,response)=>{
    const{email,password} =request.body;
    const{statusCode,data} = await login({email,password})
    response.status(statusCode).send(data);
})
export default userRouter;
