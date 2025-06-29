import dotenv from 'dotenv';
dotenv.config();

import express from 'express'
import mongoose from 'mongoose';
import userRouter from './routes/User.js'
import bodyParser from 'express'
import cors from 'cors'
import recipeRouter from './routes/recipe.js'

const app = express();

app.use(bodyParser.json())
app.use(cors({
  origin:true,
  methods:["GET","POST","PUT","DELETE"],
  credentials:true
}))

// userRouter
app.use('/api', userRouter)

// recipeRouter
app.use('/api',recipeRouter)

mongoose.connect(process.env.MONGO_URL,{
    dbName:"MERN_Recipe_App",
})
.then(()=> console.log("MongoDB is connected...!"))
.catch((err) => console.log(err.message));

const port = process.env.PORT || 3000;

app.listen(port,()=> console.log(`server is running on port ${port}`))
