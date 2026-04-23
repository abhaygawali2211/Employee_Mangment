import express from "express"
import cors from "cors"
import "dotenv/config";
import multer from "multer";
import {connectDB} from "./config/db.js";
const app= express()

const PORT=process.env.PORT|| 3000

app.use(cors())
app.use(express.json())
app .use(multer().none())

app.get("/",(req,res)=>{

res.send("wlcome")
})

await connectDB()
app.listen(PORT,()=>{
console.log(`Running on ${PORT}`)

})