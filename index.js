const express =require("express")
const cookieParser =require("cookie-parser")

require("dotenv").config();

const dbConnect=require("./Config/dbConnect")

const app=express();

app.use(express.json())
app.use(cookieParser());

app.listen(process.env.PORT,()=>{
    console.log("APP is started at port no  ",process.env.PORT)
})

dbConnect()

const router=require("./Routes/routes")

app.use("/api/v1",router)




