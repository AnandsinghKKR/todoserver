import express from "express";
import apiRoute, { apiProtected } from "./routes/api.js";
import mongoose from "mongoose";
import AuthMiddleware from "./middlewares/AuthMiddleware.js";
import cors from 'cors';
import 'dotenv/config'

const app=express();

mongoose.connect(process.env.DB_CONNECT,{useNewUrlParser:true});
const port=process.env.PORT || 8000;

console.log(process.env.DB_CONNECT)
app.use(cors())
app.use(express.json());
app.use('/api/', apiRoute);
app.use('/api/',AuthMiddleware,apiProtected)
app.listen(port,()=>console.log("server is running"));