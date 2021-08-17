import express from 'express'
import userRoutes from './routes/users'
import bodyParser from 'body-parser'
const app=express()
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended:true}));
app.use((req:any,res:any,next:any)=>{
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
})
app.use(userRoutes)
app.listen(3000)