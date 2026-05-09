import "dotenv/config"
import { connectDB } from "./config/db.js"
import bcrypt from "bcrypt"
import User from "./models/User.js";
const TemporaryPassword= "admin123"
async function registerAdmin(){
try {
    
    const ADMIN_EMAIL=process.env.ADMIN_EMAIL;
    if(!ADMIN_EMAIL){
        console.error("missing Admin_Email envvariable")
        process.exit(1)
    }
    await connectDB()
    const existingAdmin= await User.findOne({
        email:process.env.ADMIN_EMAIL
    })

    if(existingAdmin){
        console.log("user already exist as role",existingAdmin.role)
        process.exit(0)
    }
 
 
    const hashedPassword= await bcrypt.hash(TemporaryPassword,10)
    const admin=await User.create({
        email:process.env.ADMIN_EMAIL,
        password:hashedPassword,
        role:"ADMIN"
    })
    console.log("Admin created")
    console.log("/email",admin.email)
    console.log("password",TemporaryPassword)
    console.log("/nchange the password after ;login")
    process.exit()
} catch (error) {
    console.error("seed failed:",error)
}
}
registerAdmin()