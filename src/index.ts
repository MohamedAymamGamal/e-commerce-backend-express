import express from 'express';
import mongoose from 'mongoose';
import router from './routes/userRoute';
const app = express()
const port = 5001;
app.use(express.json())
mongoose
  .connect("mongodb://127.0.0.1:27017/commerce")
  .then(() => console.log("Connected!"))
  .catch((err) =>console.log("failed to Connect",err));
app.use('/user',router)
  app.listen(port, () =>{
    console.log(`server is running at :http://localhost:${port}`)
})